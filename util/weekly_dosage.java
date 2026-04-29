public class weekly_dosage {
    public static void main(String args[]) {

        int    start     = 1;
        int    end       = 8;
        int    weeks     = 48 + 1;
        double vial      = 60.0;   // mg in a full vial
        int    fromWeek  = 22;     // the week you start this vial on



        // weekly dose schedule
        for (int i = start; i < weeks; i++) {
            double j = (i * ((double) end / weeks));
            System.out.println("Week: [" + i + "] Dosage: [" + j + "]mg");
        }


        // vial tracking from a given week
        System.out.println();
        System.out.printf("Vial: %.2fmg, starting at week %d%n", vial, fromWeek);

        double remaining = vial;
        int    lastWeek  = fromWeek - 1;
        int    doses     = 0;

        for (int i = fromWeek; i < weeks; i++) {
            double dose = i * ((double) end / weeks);
            if (remaining < dose) {
                System.out.printf("Week: [%d] need %.4fmg, only %.4fmg left -- vial empty%n",
                                  i, dose, remaining);
                break;
            }
            remaining -= dose;
            lastWeek = i;
            doses++;
            System.out.printf("Week: [%d] Dose: %.4fmg  Remaining: %.4fmg%n",
                              i, dose, remaining);
        }

        System.out.println();
        System.out.printf("Vial covered %d doses (week %d through %d)%n",
                          doses, fromWeek, lastWeek);
        if (lastWeek >= weeks - 1) {
            System.out.println("Vial lasts through the full schedule.");
        } else {
            System.out.printf("Vial runs out -- you'll need another one before week %d.%n",
                              weeks - 1);
        }
    }
}