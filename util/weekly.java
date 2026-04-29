public class weekly {
    public static void main(String args[]) {

        int start   = 1;
        int end     = 10;
        int weeks   = 48 + 1;



        /* */
        for (int i = start; i < weeks; i++) {
            double j = (i * ((double) end / weeks));
            System.out.println("Week: [" + i + "] Dosage: [" + j + "]mg");
        /* */


        /* Needs to change "weeks" to a personally defined number of days because peptides such as GHK-Cu are daily
        will probably do something that detects if it's a daily dosage and show as "Day" rather than timeframe and 7 days as "Week"  */


        }

    }
}
