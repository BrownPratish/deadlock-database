export type Hero = {
  id: number;
  name: string;
};

export type ItemType = "ability" | "upgrade" | "unknown";
export type SlotType = "weapon" | "vitality" | "spirit";

export type Item = {
  id: number;
  name: string;
  tier: number | null;
  type: ItemType;
  slot_type: SlotType | null;
  cost: number | null;
};
