({
    name: "PuppyPID", // Category Name
    description: "PID line following for PuppyBot",
    author: "PrinceBot",
    category: "Sensors",
    version: "1.0.0",
    icon: "/static/icon.png", // Category icon
    color: "#28B463", // Category color (recommend some blocks color)
    blocks: [ // Blocks in Category
        "puppy_pid_front_setpin",
        {
            xml: `
                <block type="puppy_pid_front_setmin">
                    <value name="s0"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                    <value name="s1"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                    <value name="s2"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                    <value name="s3"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                    <value name="s4"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                    <value name="s5"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                    <value name="s6"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                    <value name="s7"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                </block>
            `
        },
        {
            xml: `
                <block type="puppy_pid_front_setmax">
                    <value name="s0"><shadow type="math_number"><field name="NUM">4000</field></shadow></value>
                    <value name="s1"><shadow type="math_number"><field name="NUM">4000</field></shadow></value>
                    <value name="s2"><shadow type="math_number"><field name="NUM">4000</field></shadow></value>
                    <value name="s3"><shadow type="math_number"><field name="NUM">4000</field></shadow></value>
                    <value name="s4"><shadow type="math_number"><field name="NUM">4000</field></shadow></value>
                    <value name="s5"><shadow type="math_number"><field name="NUM">4000</field></shadow></value>
                    <value name="s6"><shadow type="math_number"><field name="NUM">4000</field></shadow></value>
                    <value name="s7"><shadow type="math_number"><field name="NUM">4000</field></shadow></value>
                </block>
            `
        },
        {
            xml: `
                <block type="puppy_pid_front_run_pid">
                    <value name="speed"><shadow type="math_number"><field name="NUM">50</field></shadow></value>
                    <value name="kp"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
                    <value name="kd"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
                </block>
            `
        },
        "puppy_pid_front_read_line",
        {
            xml: `
                <block type="puppy_pid_calibrate_front_sensor">
                    <value name="times"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
                </block>
            `
        },
        // "puppy_pid_ref_front_sensor"
    ],
    chip: [
        "RP2"
    ]
});
