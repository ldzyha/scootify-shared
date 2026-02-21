import { ProductSpecs } from '@scootify/shared/types/product';
import styles from './ShippingSpecs.module.css';

/**
 * Props for ShippingSpecs component
 */
export interface ShippingSpecsProps {
  /** Shipping specifications from ProductSpecs */
  shipping: ProductSpecs['shipping'];
  /** Additional CSS class */
  className?: string;
}

/**
 * Shipping info display with weight, dimensions, and Nova Poshta details.
 * 
 * @example
 * ```tsx
 * <ShippingSpecs 
 *   shipping={{
 *     weightKg: 25,
 *     seatsAmount: 1,
 *     boxes: [{ lengthCm: 120, widthCm: 60, heightCm: 50, weightKg: 25 }]
 *   }}
 * />
 * ```
 */
export function ShippingSpecs({
  shipping,
  className = '',
}: ShippingSpecsProps) {
  if (!shipping) return null;

  // Calculate volumetric weight for each box
  const volumetricWeights = shipping.boxes.map(box => {
    // Nova Poshta formula: (L × W × H) / 4000
    return (box.lengthCm * box.widthCm * box.heightCm) / 4000;
  });

  const totalVolumetricWeight = volumetricWeights.reduce((sum, w) => sum + w, 0);
  const totalActualWeight = shipping.boxes.reduce((sum, box) => sum + box.weightKg, 0);
  const chargeableWeight = Math.max(totalActualWeight, totalVolumetricWeight);

  return (
    <div className={`${styles.container} ${className}`}>
      <h3 className={styles.heading}>Доставка</h3>
      
      <div className={styles.overview}>
        <div className={styles.spec}>
          <div className={styles.label}>Вага посилки</div>
          <div className={styles.value}>{shipping.weightKg} кг</div>
        </div>

        <div className={styles.spec}>
          <div className={styles.label}>Кількість місць</div>
          <div className={styles.value}>{shipping.seatsAmount}</div>
        </div>

        <div className={styles.spec}>
          <div className={styles.label}>Розрахункова вага</div>
          <div className={styles.value}>
            {chargeableWeight.toFixed(1)} кг
            {chargeableWeight !== totalActualWeight && (
              <span className={styles.volumetric}> (об'ємна)</span>
            )}
          </div>
        </div>
      </div>

      {/* Box details */}
      {shipping.boxes.length > 0 && (
        <div className={styles.boxes}>
          <div className={styles.boxesHeading}>Габарити місць</div>
          {shipping.boxes.map((box, index) => (
            <div key={index} className={styles.box}>
              <div className={styles.boxNumber}>
                Місце {shipping.seatsAmount > 1 ? `${index + 1}/${shipping.seatsAmount}` : '1/1'}
              </div>
              <div className={styles.boxDimensions}>
                {box.lengthCm} × {box.widthCm} × {box.heightCm} см
              </div>
              <div className={styles.boxWeight}>
                {box.weightKg} кг
                {volumetricWeights[index] > box.weightKg && (
                  <span className={styles.volumetricNote}>
                    {' '}(об. {volumetricWeights[index].toFixed(1)} кг)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cargo description */}
      {shipping.cargoDescription && (
        <div className={styles.cargoInfo}>
          <div className={styles.cargoLabel}>Опис вантажу:</div>
          <div className={styles.cargoValue}>{shipping.cargoDescription}</div>
        </div>
      )}

      {/* Info note */}
      <div className={styles.note}>
        💡 Розрахункова вага визначається за формулою Нової Пошти: max(фактична вага, об'ємна вага).
        Об'ємна вага = (Д × Ш × В) / 4000
      </div>
    </div>
  );
}

export default ShippingSpecs;
