#!/bin/bash
# ============================================
# Sync shared components to Next.js 16/Turbopack sites
# ============================================
#
# Turbopack cannot resolve runtime (value) imports from workspace packages.
# Only type-only imports (import type { X }) resolve from @scootify/shared.
#
# This script copies shared components into a local src/components/shared/
# directory, rewriting imports for Turbopack compatibility:
#   - ../types/* → @scootify/shared/types/* (type-only, resolves fine)
#   - ../lib/*   → @/lib/*                 (runtime values, needs local path)
#   - ../config/* → @scootify/shared/config/*
#   - ../data/*  → @scootify/shared/data/*
#
# Supports TWO types of components:
#   1. CSS-module-free: just copies the .tsx file
#   2. CSS-module components: copies .tsx + .module.css (+ companion files)
#
# IMPORTANT: Sites using this script must have a local @/lib/metallic.ts
# that exports the same names as @scootify/shared/lib/metallic:
#   - metallicBase, metallicSubtle, MetallicVariant, MetallicBaseVariant, etc.
#
# Usage: ./sync-components-to-site.sh <site-dir>
# Example: ./sync-components-to-site.sh /home/dzy/hiley.com.ua

set -euo pipefail

SHARED_DIR="$(cd "$(dirname "$0")/.." && pwd)/src/components"
SITE_DIR="${1:?Usage: $0 <site-dir>}"
TARGET_DIR="$SITE_DIR/src/components/shared"

echo "Syncing shared components to $TARGET_DIR"

# Create target directory
mkdir -p "$TARGET_DIR"

# ============================================
# CSS-module-free components (just .tsx)
# ============================================
COMPONENTS_PLAIN=(
  "Icon.tsx"
  "MetallicText.tsx"
  "MetallicButton.tsx"
  "MetallicCard.tsx"
  "ColorSwatches.tsx"
  "ProductTerms.tsx"
  "ProductImage.tsx"
  "Picture.tsx"
  "CallbackRequest.tsx"
  "VideoEmbed.tsx"
)

# ============================================
# CSS-module components (.tsx + .module.css + optional companions)
# Format: "Component.tsx|companion1.ts|companion2.ts"
# The .module.css is auto-detected (same basename as .tsx)
# ============================================
COMPONENTS_CSS_MODULE=(
  "VariantSelector.tsx"
  "Dialog.tsx"
  "Carousel.tsx|carousel-engine.ts"
  "Toast.tsx"
)

# ============================================
# Helper: rewrite imports in a .tsx file
# ============================================
rewrite_imports() {
  local dst="$1"
  # Rewrite relative imports for Turbopack compatibility
  sed -i "s|from '\.\./types/|from '@scootify/shared/types/|g" "$dst"
  sed -i "s|from '\.\./lib/|from '@/lib/|g" "$dst"
  sed -i "s|from '\.\./config/|from '@scootify/shared/config/|g" "$dst"
  sed -i "s|from '\.\./data/|from '@scootify/shared/data/|g" "$dst"
  
  # Also rewrite package-scoped runtime value imports:
  #   @scootify/shared/lib/* → @/lib/*  (Turbopack can't resolve runtime values from workspace)
  # Note: @scootify/shared/types/* stays as-is (type-only imports resolve fine)
  sed -i "s|from '@scootify/shared/lib/|from '@/lib/|g" "$dst"
}

# ============================================
# Sync plain components
# ============================================
echo ""
echo "--- CSS-module-free components ---"
for file in "${COMPONENTS_PLAIN[@]}"; do
  src="$SHARED_DIR/$file"
  dst="$TARGET_DIR/$file"

  if [ ! -f "$src" ]; then
    echo "  SKIP: $file (not found)"
    continue
  fi

  cp "$src" "$dst"
  rewrite_imports "$dst"
  echo "  SYNC: $file"
done

# ============================================
# Sync CSS-module components
# ============================================
echo ""
echo "--- CSS-module components ---"
for entry in "${COMPONENTS_CSS_MODULE[@]}"; do
  # Parse entry: first item is the .tsx, rest are companions
  IFS='|' read -ra parts <<< "$entry"
  tsx_file="${parts[0]}"
  base_name="${tsx_file%.tsx}"
  css_file="${base_name}.module.css"

  # Copy .tsx
  src_tsx="$SHARED_DIR/$tsx_file"
  dst_tsx="$TARGET_DIR/$tsx_file"
  if [ ! -f "$src_tsx" ]; then
    echo "  SKIP: $tsx_file (not found)"
    continue
  fi
  cp "$src_tsx" "$dst_tsx"
  rewrite_imports "$dst_tsx"
  echo "  SYNC: $tsx_file"

  # Copy .module.css
  src_css="$SHARED_DIR/$css_file"
  dst_css="$TARGET_DIR/$css_file"
  if [ -f "$src_css" ]; then
    cp "$src_css" "$dst_css"
    echo "  SYNC: $css_file"
  else
    echo "  WARN: $css_file not found (component may break)"
  fi

  # Copy companion files (e.g., carousel-engine.ts)
  for ((i=1; i<${#parts[@]}; i++)); do
    companion="${parts[$i]}"
    src_comp="$SHARED_DIR/$companion"
    dst_comp="$TARGET_DIR/$companion"
    if [ -f "$src_comp" ]; then
      cp "$src_comp" "$dst_comp"
      rewrite_imports "$dst_comp"
      echo "  SYNC: $companion (companion)"
    else
      echo "  WARN: $companion not found (companion)"
    fi
  done
done

# ============================================
# Sync section components (in sections/ subdirectory)
# ============================================
SECTIONS_DIR="$SHARED_DIR/sections"
TARGET_SECTIONS_DIR="$TARGET_DIR/sections"

if [ -d "$SECTIONS_DIR" ]; then
  echo ""
  echo "--- Section components ---"
  mkdir -p "$TARGET_SECTIONS_DIR"
  
  SECTION_FILES=(
    "index.ts"
    "BreadcrumbNav.tsx"
    "KeySpecsBadges.tsx"
    "CTAButtons.tsx"
    "GuaranteeBadges.tsx"
    "DescriptionRenderer.tsx"
    "VideoSection.tsx"
    "SimilarProductsGrid.tsx"
  )
  
  for file in "${SECTION_FILES[@]}"; do
    src="$SECTIONS_DIR/$file"
    dst="$TARGET_SECTIONS_DIR/$file"
    
    if [ ! -f "$src" ]; then
      echo "  SKIP: sections/$file (not found)"
      continue
    fi
    
    cp "$src" "$dst"
    
    # Rewrite relative imports: ../Icon → ../Icon (stays relative within shared/)
    # But rewrite @scootify/shared/* imports
    sed -i "s|from '@scootify/shared/types/|from '@scootify/shared/types/|g" "$dst"
    sed -i "s|from '@scootify/shared/lib/|from '@/lib/|g" "$dst"
    
    echo "  SYNC: sections/$file"
  done
fi

echo ""
echo "Done. Components synced to $TARGET_DIR"
echo "Import them as: import { Component } from '@/components/shared/Component'"
