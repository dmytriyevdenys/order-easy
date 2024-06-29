import { useSearchSettlements } from "hooks/Order/feature/useSearchSettlements";
import { useSearchWarehouse } from "hooks/Order/feature/useSearchWarehouse";

export type TAdressesProps = {
  searchSettlementProps: ReturnType<typeof useSearchSettlements>;
  searchWarehouseProps: ReturnType<typeof useSearchWarehouse>;
};
