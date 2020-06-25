#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiServer.h>
#include <WiFiUdp.h>

/*
 * Program From www.warriornux.com
 */
 
#include <SoftwareSerial.h>
#include <dht.h>
#include <BH1750.h>

SoftwareSerial wifi (3,2); // Rx Tx
BH1750 lightMeter;
dht DHT;

#define DHT11_PIN 4
#define nama_wifi "ORENBELU"
#define pass_wifi "sasihkedasa"
#define ip_host "3.23.194.174"


boolean connected = false;

void setup() {
  // put your setup code here, to run once:
wifi.begin(9600);
Serial.begin(9600);
wifi.setTimeout(5000);
lightMeter.begin();
Serial.println("ESP8266 cek cek");
delay (1000);
wifi.println("AT+RST");
delay(1000);
if(wifi.find("OK")) // jika error trus, di at command bisa, coba ganti "OK" atau "Ready"
{
  Serial.println(" ESP8266 SIAP ");
}
else {
  Serial.println(" Tidak Ada Response dari ESP8266 ");
  while(1);
}
delay(1000);

for (int i=0; i<5; i++){
  connect_to_wifi();
  if (connected){
    break;
  }
}
  if (!connected){
    while(1);
  }
  delay(5000);
  wifi.println("AT+CIPMUX=0");
  delay(1000);
}

void loop() {
  // put your main code here, to run repeatedly:
String cmd = "AT+CIPSTART=\"TCP\",\"";
cmd+= ip_host;
cmd+="\",80";
wifi.println(cmd);
  String response = "";
  long int time = millis();

 // while(  > millis() ) {
  
    
Serial.println(cmd);
if (wifi.find("Error")){
  Serial.println("Koneksi eror");
  return;
}
float chk = DHT.read11(DHT11_PIN); 
float temp = DHT.temperature;
float humi = DHT.humidity; 
float lux = lightMeter.readLightLevel();
cmd = "GET /deteksi-okupansi/sensor.php?suhu=";
cmd+=temp;
cmd+= "&humidity=";
cmd+=humi;
cmd+="&cahaya=";
cmd+=lux;
cmd+="HTTP/1.1";
cmd+="\r\n";
wifi.print("AT+CIPSEND=");
wifi.println(cmd.length());
if (wifi.find(">")){
  char c = wifi.read();
  response += c;
  Serial.print("ssssss");
  Serial.println(response);
  Serial.print(">");
} else {
  wifi.println("AT+CIPCLOSE");
  Serial.println("Koneksi Timeout");
  delay(1000);
  return;
}


wifi.print(cmd);
delay(2000);

while(wifi.available())
{
  char c =wifi.read();
  Serial.write(c);
  if (c=='r') Serial.print('n');
}
Serial.println("—–end");
delay(10000);
}

void connect_to_wifi()
{
  wifi.println("AT+CWMODE=1");
  String cmd = "AT+CWJAP=\"";
  cmd+=nama_wifi;
  cmd+="\",\"";
  cmd+=pass_wifi;
  cmd+="\"";
  wifi.println(cmd);
  Serial.println(cmd);
  if (wifi.find("OK")){
    Serial.println("Berhasil Terkoneksi ke internet");
  connected=true;
  } else {
    Serial.println("Gagal Terkoneksi");
  connected=false;
  }

}