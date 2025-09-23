import { BRAND } from "./brand";

export const Price = ({ value }: { value: number }) => (
  <span style={{ color: BRAND.violet, fontWeight: 700 }}>
    {value.toLocaleString("fr-DZ")} DZD
  </span>
);
