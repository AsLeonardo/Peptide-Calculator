## Calctide

Browser-based peptide reconstitution and dosage calculator.

**[Calctide demo →](https://your-link-here)**

![Calctide demo](assets/demo.gif)

## What it does

Pick a syringe size, vial milligrams, bac water milliliter, and target dose in mcg.
Calctide shows how many units to draw on the chosen syringe, as well as showing the fill level on a scale ruler.

If the requested dose exceeds the chosen syringe, you get a warning instead of a number.

## Repo layout

| File | What it does |
|---|---|
| `index.html`, `css/styles.css`, `js/script.js` | The web app |
| `ruler.py` | Generates the 30 / 50 / 100-unit syringe ruler PNGs |
| `weekly.java` | Linear weekly dose-ramp schedule |
| `weekly_dosage.java` | Weekly schedule + vial tracking from a given start week |
| `reconstitution.java` | Compares reconstitution options across bac-water volumes |

## Disclaimer

For educational, informational, and research purposes only. Not medical advice, diagnosis, or treatment. Verify every calculation with a qualified professional before any real use.

## License

[MIT](LICENSE).
