// Code by Deron Li (deron_li@hotmail.com) + Riley Co (rileyco@live.com) + Ali Tayyebi (satjazayeri@gmail.com)
// includes bits of modified code from Adafruit + Arduino folks

#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
#include <avr/power.h>
#endif

#define PIN 6

boolean pressMe = true;
int fsrPin = 0; // the FSR and 10K pulldown are connected to a0
int fsrReading; // the analog reading from the FSR resistor divider
Adafruit_NeoPixel strip = Adafruit_NeoPixel(60, PIN, NEO_GRB + NEO_KHZ800);



#include <SPI.h>
#include <FileIO.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#define accel_module (0x53)
byte values[6] ;
//char output[512];
int currentX;
int currentY;
int currentPosition;
int currentTime;
int lastTime;
int accelX;
int accelY;
int accelPosition;
int deltaPosition;
int deltaX;
int deltaY;
int deltaZ;
int deltaMovement;


void setup() {

//  Bridge.begin();
  Serial.begin(9600);
  //Serial.println("hello there");

  // setting up the accelerometer
  Wire.begin();
  Wire.beginTransmission(accel_module);
  Wire.write(0x2D);
  Wire.write(0);
  Wire.endTransmission();
  Wire.beginTransmission(accel_module);
  Wire.write(0x2D);
  Wire.write(16);
  Wire.endTransmission();
  Wire.beginTransmission(accel_module);
  Wire.write(0x2D);
  Wire.write(8);
  Wire.endTransmission();
  
  // + accelerometer time things
  currentTime = millis();
  currentX = (((int)values[1]) << 8) | values[0];
  currentY = (((int)values[3])<< 8) | values[2];

    #if defined (__AVR_ATtiny85__)
    if (F_CPU == 16000000) clock_prescale_set(clock_div_1);
  #endif
  // End of trinket special code


  strip.begin();
  strip.show(); // Initialize all pixels to 'off'

  colorWipe(strip.Color(7, 187, 162), 50); // teal

}

void loop() {
//  Serial.println("hi");
//  Serial.println("hasdfasdfi");
  // start accelerometer
  accelerometer();

  
  //Serial.print(deltaX);
  //Serial.print(deltaY);
  //Serial.println();
  Serial.println(deltaMovement);
  //Serial.println(1);
    


fsrReading = analogRead(fsrPin);
//Serial.print("Analog reading = ");
//Serial.print(fsrReading); // the raw analog reading
// We'll have a few threshholds, qualitatively determined
if ((fsrReading > 200)&&(pressMe==true)) {
    pressMe = false;
  }else if ((fsrReading > 200)&&(pressMe==false)){
     pressMe = true;
  }

   
  if (pressMe==true){
  colorWipe(strip.Color(7, 187, 162), 50); // teal
//Serial.println(" - press");
  }
  if (pressMe==false){
  colorWipe(strip.Color(237, 61, 46), 50); // red
//Serial.println(" - press");
  }
  
  delay(100);
}


// Fill the dots one after the other with a color
void colorWipe(uint32_t c, uint8_t wait) {
  for(uint16_t i=0; i<strip.numPixels(); i++) {
    strip.setPixelColor(i, c);
    strip.show();
    delay(wait);
  }
}

void accelerometer(){
  
  int xyzregister = 0x32;
  float x, y;
  lastTime = currentTime;
  currentTime = millis();
  Wire.beginTransmission(accel_module);
  Wire.write(xyzregister);
  Wire.endTransmission();
  Wire.beginTransmission(accel_module);
  Wire.requestFrom(accel_module, 6);
  int i = 0;
  while(Wire.available()){
    values[i] = Wire.read();
    i++;
  }
  Wire.endTransmission();
  accelX = (((int)values[1]) << 8) | values[0];
  accelY = (((int)values[3])<< 8) | values[2];
  deltaX = abs(currentX - accelX);
  deltaY = abs(currentY - accelY);
  deltaMovement = (deltaX + deltaY) / 2;
  delay(200);
//  Serial.println(abs(deltaPosition));
  currentX = accelX;
  currentY = accelY;
  
}

