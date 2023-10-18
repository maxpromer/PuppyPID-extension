from machine import SPI,Pin,ADC,PWM
import time

def delay(delay_timer):
    time.sleep_ms(delay_timer)

def mapf(x,in_min,in_max,out_min,out_max):
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min

class puppybot():
    def __init__(self):
        self.FSensor_min = [15,15,15,0,0,0,0,0]
        self.FSensor_max = [100,100,100,100,100,100,100,100]
        self.FSensor_Pin = [0,0,0,0,0,0,0,0]
        self.status_onLine = 0
        self._lastPosition = 0
        self.previous_error = 0
        self.sensor_detect_color = ''
        self.numSensor= 0
        self.pwmM1A = PWM(Pin(1))
        self.pwmM1B = PWM(Pin(0))
        self.pwmM2A = PWM(Pin(3))
        self.pwmM2B = PWM(Pin(2))
        self.pwmM3A = PWM(Pin(10))
        self.pwmM3B = PWM(Pin(11))
        self.pwmM4A = PWM(Pin(8))
        self.pwmM4B = PWM(Pin(9))
        self.pwmM1A.freq(1000)
        self.pwmM1B.freq(1000)
        self.pwmM2A.freq(1000)
        self.pwmM2B.freq(1000)
        self.pwmM3A.freq(1000)
        self.pwmM3B.freq(1000)
        self.pwmM4A.freq(1000)
        self.pwmM4B.freq(1000)

    def motor(self,pin_motor_,direct_motor,speed_motor):
        if(speed_motor > 100):
            speed_motor = 100
        elif(speed_motor <= 0):
            speed_motor = 0
        speed_motor = speed_motor * 655
        if(pin_motor_ == 1):
            if(direct_motor == 1):
                self.pwmM1A.duty_u16(65535-speed_motor)
                self.pwmM1B.duty_u16(65535)
            elif(direct_motor == 2):
                self.pwmM1A.duty_u16(65535)
                self.pwmM1B.duty_u16(65535-speed_motor)
        elif(pin_motor_ == 2):
            if(direct_motor == 1):
                self.pwmM2A.duty_u16(65535-speed_motor)
                self.pwmM2B.duty_u16(65535)
            elif(direct_motor == 2):
                self.pwmM2A.duty_u16(65535)
                self.pwmM2B.duty_u16(65535-speed_motor)
        elif(pin_motor_ == 3):
            if(direct_motor == 1):
                self.pwmM3A.duty_u16(65535-speed_motor)
                self.pwmM3B.duty_u16(65535)
            elif(direct_motor == 2):
                self.pwmM3A.duty_u16(65535)
                self.pwmM3B.duty_u16(65535-speed_motor)
        elif(pin_motor_ == 4):
            if(direct_motor == 1):
                self.pwmM4A.duty_u16(65535-speed_motor)
                self.pwmM4B.duty_u16(65535)
            elif(direct_motor == 2):
                self.pwmM4A.duty_u16(65535)
                self.pwmM4B.duty_u16(65535-speed_motor)
    def motor2(self,ch,speed_motor):
        if speed_motor <0:
            self.motor(ch,2,abs(speed_motor))
        elif speed_motor >= 0:
            self.motor(ch,1,abs(speed_motor))
    
    def ADC(self,ch):
        if ch < 8:
            muxCH = [[0,1,0],[1,0,0],[0,0,0],[1,1,0],[0,0,1],[0,1,1],[1,1,1],[1,0,1]]
            muxADD1 = Pin(22, Pin.OUT)
            muxADD2 = Pin(23, Pin.OUT)
            muxADD3 = Pin(24, Pin.OUT)
            muxADD1.value(muxCH[ch][0])
            muxADD2.value(muxCH[ch][1])
            muxADD3.value(muxCH[ch][2])
            adc = ADC(Pin(26))
            return int(adc.read_u16()/655.35)
        elif ch >= 8 and ch < 11:
            adc = ADC(Pin(19+ch))
            return int(adc.read_u16()/655.35)
    

    def set_pinSensor(self,sensor_pin,color):
        #global sensor_detect_color,numSensor
        self.sensor_detect_color = color
        self.numSensor = len(sensor_pin)
        for i in range(len(sensor_pin)):
            self.FSensor_Pin[i]=sensor_pin[i]
    def set_min_sensor(self,sensor_min):
        for i in range(len(sensor_min)):
            self.FSensor_min[i]=sensor_min[i]
    def set_max_sensor(self,sensor_max):
        for i in range(len(sensor_max)):
            self.FSensor_max[i]=sensor_max[i]
        
    def read_sensor(self,sensor_pin):
        if(self.sensor_detect_color =='White'):
            return mapf(self.ADC(self.FSensor_Pin[sensor_pin]),self.FSensor_min[sensor_pin],self.FSensor_max[sensor_pin],0,100)
        else:
            return mapf(self.ADC(self.FSensor_Pin[sensor_pin]),self.FSensor_min[sensor_pin],self.FSensor_max[sensor_pin],100,0)
    def calibrate_sensor(self,round_readSensor):
        #global FSensor_min,FSensor_max,numSensor
        for i in range(self.numSensor):
            self.FSensor_min[i] = 100
            self.FSensor_max[i] = 0
        for i in range(round_readSensor):
            for j in range(self.numSensor):
                if self.ADC(self.FSensor_Pin[j]) < self.FSensor_min[j]:
                    self.FSensor_min[j] = self.ADC(self.FSensor_Pin[j])
                if self.ADC(self.FSensor_Pin[j]) > self.FSensor_max[j]:
                    self.FSensor_max[j] = self.ADC(self.FSensor_Pin[j])
        for i in range(self.numSensor):
            print("min>" + str(i)+"="+str(self.FSensor_min[i])+"max=" + str(i)+"="+str(self.FSensor_max[i]))

    def readLine(self):
        #global _lastPosition,numSensor
        status_onLine = False 
        sum_val = 0
        avg_val = 0
        for i in range(self.numSensor):
            val = self.read_sensor(i)
            if(val > 5):
                avg_val += val * (i * 100)
                sum_val += val
            if(val >20):
                status_onLine = True
        if(status_onLine == False):
            if (self._lastPosition < ((self.numSensor-1) * 100)/2):
                self._lastPosition = 0
            else:
                self._lastPosition = ((self.numSensor-1) * 100)
        else:
            self._lastPosition = avg_val / sum_val
        return self._lastPosition

    def lineFollowing(self,RUN_PID_speed,RUN_PID_KP,RUN_PID_KD):
        #global previous_error,numSensor
        present_position = self.readLine()
        setpoint = ((self.numSensor - 1) * 100) / 2
        errors = present_position - setpoint
        derivative = (errors - self.previous_error)
        output = RUN_PID_KP * errors  + RUN_PID_KD * derivative
        m1Speed = RUN_PID_speed + output
        m2Speed = RUN_PID_speed - output
        self.motor2(1,int(m1Speed))
        self.motor2(2,int(m2Speed))
        self.previous_error = errors

    def lineFollowing_4wd(self,RUN_PID_speed,RUN_PID_KP,RUN_PID_KD):
        #global previous_error,numSensor
        present_position = self.readLine()
        setpoint = ((self.numSensor - 1) * 100) / 2
        errors = present_position - setpoint
        derivative = (errors - self.previous_error)
        output = RUN_PID_KP * errors  + RUN_PID_KD * derivative
        m1Speed = RUN_PID_speed + output
        m2Speed = RUN_PID_speed - output
        self.motor2(1,int(m1Speed))
        self.motor2(2,int(m2Speed))
        self.motor2(3,int(m1Speed))
        self.motor2(4,int(m2Speed))
        self.previous_error = errors

PuppyBotEx = puppybot()
