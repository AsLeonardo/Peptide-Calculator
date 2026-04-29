public class reconstitution {
    public static void main(String args[]) {

        int    start    = 1;
        int    end      = 8;
        int    weeks    = 48 + 1;
        double vial     = 60.0;
        int    fromWeek = 22;



        // vial tracking (unchanged)
        double remaining = vial;
        int    lastWeek  = fromWeek - 1;
        double maxDose   = 0;

        for (int i = fromWeek; i < weeks; i++) {
            double dose = i * ((double) end / weeks);
            if (remaining < dose) break;
            remaining -= dose;
            lastWeek = i;
            if (dose > maxDose) maxDose = dose;
        }


        // reconstitution
        double[] bacOptions = { 1.0, 1.5, 2.0, 3.0 };

        System.out.printf("Vial %.0fmg, using weeks %d-%d (max dose in range: %.2fmg)%n%n",
                          vial, fromWeek, lastWeek, maxDose);
        System.out.println("BAC water  | mg/mL | mg per unit | units at max dose");
        System.out.println("-----------+-------+-------------+-------------------");

        for (double bac : bacOptions) {
            double mgPerMl   = vial / bac;
            double mgPerUnit = mgPerMl / 100.0;     // U-100 insulin syringe: 1 unit = 0.01 mL
            double unitsMax  = maxDose / mgPerUnit;
            System.out.printf("%6.2f mL  | %5.1f | %11.3f | %6.2f units%n",
                              bac, mgPerMl, mgPerUnit, unitsMax);
        }
    }
}