-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "origin" TEXT,
ADD COLUMN     "texture" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "approach" TEXT,
ADD COLUMN     "brief" TEXT,
ADD COLUMN     "processGallery" TEXT[],
ADD COLUMN     "subtitle" TEXT;
