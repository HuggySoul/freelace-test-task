export type PackageType = "компрессия" | "некомпрессия";

export type Product = {
  id: string;
  packsNumber: number;
  packageType: PackageType;
  isArchived: boolean;
  createdAt: string;
};
