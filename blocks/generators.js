Blockly.Python['puppy_pid_front_setpin'] = function(block) {
  Blockly.Python.definitions_['from_PuppyBotEx_import_PuppyBotEx'] = 'from PuppyBotEx import PuppyBotEx';

  var dropdown_color = block.getFieldValue('color');
  var dropdown_s0_pin = block.getFieldValue('s0_pin');
  var dropdown_s1_pin = block.getFieldValue('s1_pin');
  var dropdown_s2_pin = block.getFieldValue('s2_pin');
  var dropdown_s3_pin = block.getFieldValue('s3_pin');
  var dropdown_s4_pin = block.getFieldValue('s4_pin');
  var dropdown_s5_pin = block.getFieldValue('s5_pin');
  var dropdown_s6_pin = block.getFieldValue('s6_pin');
  var dropdown_s7_pin = block.getFieldValue('s7_pin');

  
  let pin = [];
  for (let i=0;i<8;i++) {
    const value = block.getFieldValue(`s${i}_pin`);
    if (value !== "None") {
      pin.push(value);
    } else {
      break;
    }
  }

  var code = `PuppyBotEx.set_pinSensor([ ${pin.join(", ")} ], "${dropdown_color}")\n`;
  return code;
};

Blockly.Python['puppy_pid_front_setmin'] = function(block) {
  var value_s0 = Blockly.Python.valueToCode(block, 's0', Blockly.Python.ORDER_ATOMIC);
  var value_s1 = Blockly.Python.valueToCode(block, 's1', Blockly.Python.ORDER_ATOMIC);
  var value_s2 = Blockly.Python.valueToCode(block, 's2', Blockly.Python.ORDER_ATOMIC);
  var value_s3 = Blockly.Python.valueToCode(block, 's3', Blockly.Python.ORDER_ATOMIC);
  var value_s4 = Blockly.Python.valueToCode(block, 's4', Blockly.Python.ORDER_ATOMIC);
  var value_s5 = Blockly.Python.valueToCode(block, 's5', Blockly.Python.ORDER_ATOMIC);
  var value_s6 = Blockly.Python.valueToCode(block, 's6', Blockly.Python.ORDER_ATOMIC);
  var value_s7 = Blockly.Python.valueToCode(block, 's7', Blockly.Python.ORDER_ATOMIC);

  var code = `PuppyBotEx.set_min_sensor([ ${value_s0}, ${value_s1}, ${value_s2}, ${value_s3}, ${value_s4}, ${value_s5}, ${value_s6}, ${value_s7} ])\n`;
  return code;
};

Blockly.Python['puppy_pid_front_setmax'] = function(block) {
  var value_s0 = Blockly.Python.valueToCode(block, 's0', Blockly.Python.ORDER_ATOMIC);
  var value_s1 = Blockly.Python.valueToCode(block, 's1', Blockly.Python.ORDER_ATOMIC);
  var value_s2 = Blockly.Python.valueToCode(block, 's2', Blockly.Python.ORDER_ATOMIC);
  var value_s3 = Blockly.Python.valueToCode(block, 's3', Blockly.Python.ORDER_ATOMIC);
  var value_s4 = Blockly.Python.valueToCode(block, 's4', Blockly.Python.ORDER_ATOMIC);
  var value_s5 = Blockly.Python.valueToCode(block, 's5', Blockly.Python.ORDER_ATOMIC);
  var value_s6 = Blockly.Python.valueToCode(block, 's6', Blockly.Python.ORDER_ATOMIC);
  var value_s7 = Blockly.Python.valueToCode(block, 's7', Blockly.Python.ORDER_ATOMIC);

  var code = `PuppyBotEx.set_max_sensor([ ${value_s0}, ${value_s1}, ${value_s2}, ${value_s3}, ${value_s4}, ${value_s5}, ${value_s6}, ${value_s7} ])\n`;
  return code;
};

Blockly.Python['puppy_pid_front_run_pid'] = function(block) {
  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_kp = Blockly.Python.valueToCode(block, 'kp', Blockly.Python.ORDER_ATOMIC);
  var value_kd = Blockly.Python.valueToCode(block, 'kd', Blockly.Python.ORDER_ATOMIC);

  var code = `PuppyBotEx.lineFollowing(${value_speed}, ${value_kp}, ${value_kd})\n`;
  return code;
};

Blockly.Python['puppy_pid_front_run_pid_4wd'] = function(block) {
  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_kp = Blockly.Python.valueToCode(block, 'kp', Blockly.Python.ORDER_ATOMIC);
  var value_kd = Blockly.Python.valueToCode(block, 'kd', Blockly.Python.ORDER_ATOMIC);

  var code = `PuppyBotEx.lineFollowing_4wd(${value_speed}, ${value_kp}, ${value_kd})\n`;
  return code;
};

Blockly.Python['puppy_pid_front_read_line'] = function(block) {
  var code = 'PuppyBotEx.readLine()';

  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['puppy_pid_calibrate_front_sensor'] = function(block) {
  var value_times = Blockly.Python.valueToCode(block, 'times', Blockly.Python.ORDER_ATOMIC);

  var code = `PuppyBotEx.calibrate_sensor(${value_times})\n`;
  return code;
};

Blockly.Python['puppy_pid_ref_front_sensor'] = function(block) {
  var dropdown_sensor = block.getFieldValue('sensor');

  var code = `PuppyBotEx.\n`;
  return code;
};
