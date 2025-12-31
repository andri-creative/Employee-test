-- CreateIndex
CREATE INDEX "Employee_position_idx" ON "Employee"("position");

-- CreateIndex
CREATE INDEX "Employee_name_idx" ON "Employee"("name" ASC);

-- CreateIndex
CREATE INDEX "Employee_position_name_idx" ON "Employee"("position", "name");
