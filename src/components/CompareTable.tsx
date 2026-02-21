'use client';

import React, { useState } from 'react';
import styles from './CompareTable.module.css';
import { Price } from './Price';

interface ProductSpecs {
  // Battery specs
  batteryCapacity?: string;
  batteryVoltage?: string;
  batteryType?: string;
  range?: string;
  chargingTime?: string;
  
  // Motor specs
  motorPower?: string;
  motorType?: string;
  topSpeed?: string;
  torque?: string;
  
  // Physical dimensions
  weight?: string;
  dimensions?: string;
  wheelSize?: string;
  loadCapacity?: string;
  
  // Features
  features?: string[];
}

export interface CompareProduct {
  id: string;
  name: string;
  image?: string;
  price: number;
  currency?: string;
  purchaseModel: 'direct' | 'consultation';
  specs: ProductSpecs;
}

export interface CompareTableProps {
  products: CompareProduct[];
  onAddToCart?: (productId: string) => void;
  onRequestConsultation?: (productId: string) => void;
  onRemoveProduct?: (productId: string) => void;
}

interface SpecRow {
  label: string;
  key: keyof ProductSpecs;
  category: string;
}

const specCategories: SpecRow[] = [
  // Battery specs
  { label: 'Battery Capacity', key: 'batteryCapacity', category: 'Battery' },
  { label: 'Battery Voltage', key: 'batteryVoltage', category: 'Battery' },
  { label: 'Battery Type', key: 'batteryType', category: 'Battery' },
  { label: 'Range', key: 'range', category: 'Battery' },
  { label: 'Charging Time', key: 'chargingTime', category: 'Battery' },
  
  // Motor specs
  { label: 'Motor Power', key: 'motorPower', category: 'Motor' },
  { label: 'Motor Type', key: 'motorType', category: 'Motor' },
  { label: 'Top Speed', key: 'topSpeed', category: 'Motor' },
  { label: 'Torque', key: 'torque', category: 'Motor' },
  
  // Physical dimensions
  { label: 'Weight', key: 'weight', category: 'Dimensions' },
  { label: 'Dimensions', key: 'dimensions', category: 'Dimensions' },
  { label: 'Wheel Size', key: 'wheelSize', category: 'Dimensions' },
  { label: 'Load Capacity', key: 'loadCapacity', category: 'Dimensions' },
];

const CompareTable: React.FC<CompareTableProps> = ({
  products,
  onAddToCart,
  onRequestConsultation,
  onRemoveProduct,
}) => {
  const [mobileView, setMobileView] = useState<'scroll' | 'accordion'>('scroll');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  // Limit to 2-4 products
  const displayProducts = products.slice(0, 4);

  // Determine if values differ for highlighting
  const hasDifference = (key: keyof ProductSpecs): boolean => {
    const values = displayProducts.map(p => {
      const value = p.specs[key];
      return Array.isArray(value) ? JSON.stringify(value) : value;
    });
    const uniqueValues = new Set(values.filter(v => v !== undefined && v !== null && v !== ''));
    return uniqueValues.size > 1;
  };

  // Group specs by category
  const groupedSpecs = specCategories.reduce((acc, spec) => {
    if (!acc[spec.category]) {
      acc[spec.category] = [];
    }
    acc[spec.category].push(spec);
    return acc;
  }, {} as Record<string, SpecRow[]>);

  // Add features to grouped specs
  const hasFeatures = displayProducts.some(p => p.specs.features && p.specs.features.length > 0);

  const handleAction = (product: CompareProduct) => {
    if (product.purchaseModel === 'direct' && onAddToCart) {
      onAddToCart(product.id);
    } else if (product.purchaseModel === 'consultation' && onRequestConsultation) {
      onRequestConsultation(product.id);
    }
  };

  const renderCellContent = (product: CompareProduct, spec: SpecRow, isDifferent: boolean) => {
    const value = product.specs[spec.key];
    const displayValue = Array.isArray(value) ? value.join(', ') : value || '—';
    
    return (
      <span className={isDifferent ? styles.different : ''}>
        {displayValue}
      </span>
    );
  };

  const renderFeatures = (product: CompareProduct, isDifferent: boolean) => {
    const features = product.specs.features;
    if (!features || features.length === 0) return <span>—</span>;
    
    return (
      <ul className={`${styles.featureList} ${isDifferent ? styles.different : ''}`}>
        {features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
    );
  };

  // Desktop table view
  const renderDesktopTable = () => (
    <div className={styles.tableWrapper}>
      <table className={styles.compareTable}>
        <thead>
          <tr className={styles.stickyHeader}>
            <th className={styles.specColumn}>Specification</th>
            {displayProducts.map(product => (
              <th key={product.id} className={styles.productColumn}>
                <div className={styles.productHeader}>
                  {product.image && (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className={styles.productImage}
                    />
                  )}
                  <h3 className={styles.productName}>{product.name}</h3>
                  {onRemoveProduct && (
                    <button
                      className={styles.removeButton}
                      onClick={() => onRemoveProduct(product.id)}
                      aria-label={`Remove ${product.name}`}
                    >
                      ×
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Price Row */}
          <tr>
            <td className={styles.specLabel}>Price</td>
            {displayProducts.map(product => {
              // Assume price is in USD cents, convert to UAH
              const uahCents = Math.round(product.price * 42.25); // Fallback rate
              return (
                <td key={product.id}>
                  <Price 
                    primaryCents={uahCents}
                    secondaryCents={product.price}
                  />
                </td>
              );
            })}
          </tr>

          {/* Grouped Specs */}
          {Object.entries(groupedSpecs).map(([category, specs]) => {
            // Check if category has any values
            const hasValues = specs.some(spec => 
              displayProducts.some(p => {
                const value = p.specs[spec.key];
                return value !== undefined && value !== null && value !== '';
              })
            );
            
            if (!hasValues) return null;

            return (
              <React.Fragment key={category}>
                <tr className={styles.categoryRow}>
                  <td colSpan={displayProducts.length + 1}>
                    <strong>{category}</strong>
                  </td>
                </tr>
                {specs.map(spec => {
                  const hasValue = displayProducts.some(p => {
                    const value = p.specs[spec.key];
                    return value !== undefined && value !== null && value !== '';
                  });
                  
                  if (!hasValue) return null;
                  
                  const isDifferent = hasDifference(spec.key);
                  
                  return (
                    <tr key={spec.key}>
                      <td className={styles.specLabel}>{spec.label}</td>
                      {displayProducts.map(product => (
                        <td key={product.id}>
                          {renderCellContent(product, spec, isDifferent)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </React.Fragment>
            );
          })}

          {/* Features */}
          {hasFeatures && (
            <>
              <tr className={styles.categoryRow}>
                <td colSpan={displayProducts.length + 1}>
                  <strong>Features</strong>
                </td>
              </tr>
              <tr>
                <td className={styles.specLabel}>Key Features</td>
                {displayProducts.map(product => {
                  const isDifferent = hasDifference('features');
                  return (
                    <td key={product.id}>
                      {renderFeatures(product, isDifferent)}
                    </td>
                  );
                })}
              </tr>
            </>
          )}

          {/* Action Row */}
          <tr>
            <td className={styles.specLabel}>Action</td>
            {displayProducts.map(product => (
              <td key={product.id}>
                <button
                  className={styles.actionButton}
                  onClick={() => handleAction(product)}
                >
                  {product.purchaseModel === 'direct' ? 'Add to Cart' : 'Request Consultation'}
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  // Mobile accordion view
  const renderAccordionView = () => (
    <div className={styles.accordionView}>
      {displayProducts.map(product => {
        const isExpanded = expandedProduct === product.id;
        
        return (
          <div key={product.id} className={styles.accordionItem}>
            <button
              className={styles.accordionHeader}
              onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
            >
              <div className={styles.accordionHeaderContent}>
                {product.image && (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={styles.accordionImage}
                  />
                )}
                <div>
                  <h3 className={styles.accordionProductName}>{product.name}</h3>
                  <Price 
                    primaryCents={Math.round(product.price * 42.25)}
                    secondaryCents={product.price}
                  />
                </div>
              </div>
              <span className={styles.accordionIcon}>{isExpanded ? '−' : '+'}</span>
            </button>
            
            {isExpanded && (
              <div className={styles.accordionContent}>
                {Object.entries(groupedSpecs).map(([category, specs]) => {
                  const hasValues = specs.some(spec => {
                    const value = product.specs[spec.key];
                    return value !== undefined && value !== null && value !== '';
                  });
                  
                  if (!hasValues) return null;

                  return (
                    <div key={category} className={styles.accordionCategory}>
                      <h4>{category}</h4>
                      <dl className={styles.specList}>
                        {specs.map(spec => {
                          const value = product.specs[spec.key];
                          if (value === undefined || value === null || value === '') return null;
                          
                          const displayValue = Array.isArray(value) ? value.join(', ') : value;
                          const isDifferent = hasDifference(spec.key);
                          
                          return (
                            <React.Fragment key={spec.key}>
                              <dt>{spec.label}</dt>
                              <dd className={isDifferent ? styles.different : ''}>
                                {displayValue}
                              </dd>
                            </React.Fragment>
                          );
                        })}
                      </dl>
                    </div>
                  );
                })}
                
                {product.specs.features && product.specs.features.length > 0 && (
                  <div className={styles.accordionCategory}>
                    <h4>Features</h4>
                    {renderFeatures(product, hasDifference('features'))}
                  </div>
                )}
                
                <button
                  className={styles.actionButton}
                  onClick={() => handleAction(product)}
                >
                  {product.purchaseModel === 'direct' ? 'Add to Cart' : 'Request Consultation'}
                </button>
                
                {onRemoveProduct && (
                  <button
                    className={styles.removeButtonMobile}
                    onClick={() => onRemoveProduct(product.id)}
                  >
                    Remove from comparison
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // Mobile scroll view
  const renderScrollView = () => (
    <div className={styles.scrollWrapper}>
      {renderDesktopTable()}
    </div>
  );

  return (
    <div className={styles.compareContainer}>
      <div className={styles.mobileControls}>
        <button
          className={`${styles.viewToggle} ${mobileView === 'scroll' ? styles.active : ''}`}
          onClick={() => setMobileView('scroll')}
        >
          Scroll View
        </button>
        <button
          className={`${styles.viewToggle} ${mobileView === 'accordion' ? styles.active : ''}`}
          onClick={() => setMobileView('accordion')}
        >
          Accordion View
        </button>
      </div>
      
      <div className={styles.desktopView}>
        {renderDesktopTable()}
      </div>
      
      <div className={styles.mobileView}>
        {mobileView === 'scroll' ? renderScrollView() : renderAccordionView()}
      </div>
    </div>
  );
};

export default CompareTable;
