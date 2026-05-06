const selection = {
                    Sv: "0.3",
                    M: "5",
                    V: "1",
                    D: "100",
                };

                const values = {
                    Sv:0.3,
                    M:5,
                    V:1,
                    D:100,
                }

                const groups = {
                    Sv: {
                    "0.3": document.getElementById("Sv03"),
                    "0.5": document.getElementById("Sv05"),
                    "1.0": document.getElementById("Sv10"),
                    },
                    M: {
                    "5":     document.getElementById("M5"),
                    "10":    document.getElementById("M10"),
                    "15":    document.getElementById("M15"),
                    "other": document.getElementById("MOther"),
                    },
                    V: {
                    "1":     document.getElementById("V1"),
                    "2":     document.getElementById("V2"),
                    "3":     document.getElementById("V3"),
                    "other": document.getElementById("VOther"),
                    },
                    D: {
                    "100":   document.getElementById("D100"),
                    "500":   document.getElementById("D500"),
                    "1000":  document.getElementById("D1000"),
                    "other": document.getElementById("DOther"),
                    },
                };
                const otherInputs = {
                    M: document.getElementById("MOtherInput"),
                    V: document.getElementById("VOtherInput"),
                    D: document.getElementById("DOtherInput"),
                }

                const blueImg = document.getElementById("blue")

                const rulerImages = {
                    "0.3": "https://res.cloudinary.com/dkjsbd1db/image/upload/v1776304801/ruler_30_kj7f3e.png",
                    "0.5": "https://res.cloudinary.com/dkjsbd1db/image/upload/v1776304801/ruler_50_rl6hhy.png",
                    "1.0": "https://res.cloudinary.com/dkjsbd1db/image/upload/v1776304801/ruler_100_va7fof.png",
                };

                const messageEl = document.getElementById("message");
                const rulerImg  = document.getElementById("rulerImg");

                function render() {
                // inline computation
                const units = (values.D / (values.M * 1000 / values.V)) * 100;

                messageEl.innerHTML =
                    units > 0 && units < values.Sv * 100 + 1
                    ? `For a dosage of <b style="color: #3b82f6;">${Number(values.D.toFixed(2))}</b> mcg, fill the syringe up to <b style="color: #3b82f6;">${Number(units.toFixed(2))}</b> units`
                    : "Insufficient volume in syringe";

                blueImg.style.width = `${Number(units) / Number(values.Sv)}%`;

                for (const [groupKey, buttons] of Object.entries(groups)) {
                    for (const [value, el] of Object.entries(buttons)) {
                    el.dataset.active = selection[groupKey] === value;
                    }
                }
                for (const [groupKey, input] of Object.entries(otherInputs)) {
                    input.dataset.active = selection[groupKey] === "other";
                }

                rulerImg.src = rulerImages[selection.Sv];
                }

                for (const [groupKey, buttons] of Object.entries(groups)) {
                for (const [value, el] of Object.entries(buttons)) {
                    el.addEventListener("click", () => {
                    const wasOther = selection[groupKey] === "other";
                    selection[groupKey] = value;
                    if (value !== "other") {
                        values[groupKey] = parseFloat(value);
                    } else if (!wasOther) {
                        otherInputs[groupKey].value = values[groupKey];
                    }
                    render();
                    });
                }
                }

                for (const [groupKey, input] of Object.entries(otherInputs)) {
                input.addEventListener("input", () => {
                    const n = parseFloat(input.value);
                    if (!isNaN(n)) {
                    values[groupKey] = n;
                    render();
                    }
                });
                }
                render();

                function sizeStackFire() {
                    const rulerImgEl = document.querySelector('.row img');
                    const stackfire = document.querySelector('.stackfire');
                    if (!rulerImgEl || !stackfire) return;
                    const imgWidth = rulerImgEl.getBoundingClientRect().width;
                    stackfire.style.width = `${imgWidth * 1.5}px`;
                }

                // layout
                function applyLayout() {
                    sizeStackFire();
                    const realWidth = window.innerWidth;
                    document.querySelectorAll('.buttons').forEach(el => {
                        el.style.flexDirection = realWidth >= 982    ? 'row' : 'column';
                    });
                    document.querySelectorAll('.main').forEach(el => {
                        el.style.margin = realWidth >= 982    ? '2rem auto' : '2rem';
                    });
                    document.querySelectorAll('#message, .input, .btn, p:not(.title, .boiler)').forEach(el => {
                        el.style.fontSize = realWidth >= 982    ? '20px' : '40px';
                    });
                    document.querySelectorAll('.boiler').forEach(el => {
                        el.style.padding = realWidth >= 982    ? '31vh 16px 0' : '7vh 16px 0';
                    });
                }

                applyLayout();
                window.addEventListener('resize', applyLayout);
                window.addEventListener('load', sizeStackFire);
                window.addEventListener('resize', sizeStackFire);