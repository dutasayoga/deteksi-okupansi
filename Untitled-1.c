#include <SoftwareSerial.h>
#include <VarSpeedServo.h>
#include <dht.h>
#include <BH1750.h>

SoftwareSerial wifi(3, 2); // Rx Tx
VarSpeedServo servo;
BH1750 lightMeter;
dht DHT;

#define nama_wifi "ORENBELU"
#define pass_wifi "sasihkedasa"
#define ip_host "3.23.194.174"
#define DHT11_PIN 4

boolean connected = false;

const int ledPin9 = 13;
const int ledPin8 = 12;
const int ledPin7 = 11;
const int ledPin6 = 10;
const int ledPin5 = 9;
const int ledPin4 = 8;
const int ledPin3 = 7;
const int ledPin2 = 6;
const int ledPin1 = 5;
const int relay = A1;
// http://3.23.194.174/deteksi-okupansi/sensor.php?suhu=23&humidity=33&cahaya=2000
void setup()
{
    // put your setup code here, to run once:
    wifi.begin(9600);
    Serial.begin(9600);
    wifi.setTimeout(5000);
    pinMode(ledPin1, OUTPUT);
    pinMode(ledPin2, OUTPUT);
    pinMode(ledPin3, OUTPUT);
    pinMode(ledPin4, OUTPUT);
    pinMode(ledPin5, OUTPUT);
    pinMode(ledPin6, OUTPUT);
    pinMode(ledPin7, OUTPUT);
    pinMode(ledPin8, OUTPUT);
    pinMode(ledPin9, OUTPUT);
    pinMode(relay, OUTPUT);
    delay(1000);
    wifi.println("AT+RST");
    delay(1000);
    if (wifi.find("OK")) // jika error trus, di at command bisa, coba ganti "OK" atau "Ready"
    {
        Serial.println(" ESP8266 SIAP ");
    }
    else
    {
        Serial.println(" Tidak Ada Response dari ESP8266 ");
        while (1);
    }
    delay(1000);

    for (int i = 0; i < 5; i++)
    {
        connect_to_wifi();
        if (connected)
        {
            break;
        }
    }
    if (!connected)
    {
        while (1);
    }
    delay(1000);
    wifi.println("AT+CIPMUX=0");
    delay(1000);
}

void loop()
{
    // put your main code here, to run repeatedly:
    String cmd = "AT+CIPSTART=\"TCP\",\"";
    cmd += ip_host;
    cmd += "\",80";
    wifi.println(cmd);
    if (wifi.find("Error"))
    {
        Serial.println("Koneksi eror");
        return;
    }
    float chk = DHT.read11(DHT11_PIN); 
    float temp = DHT.temperature;
    float humi = DHT.humidity; 
    float lux = lightMeter.readLightLevel();
    //cmd = "GET /deteksi-okupansi/sensor.php/json";
    cmd = "GET /deteksi-okupansi/sensor.php?suhu=";
    cmd+=temp;
    cmd+= "&humidity=";
    cmd+=humi;
    cmd+="&cahaya=";
    cmd+=lux;
    cmd += "HTTP/1.1";
    cmd += "\r\n";
    wifi.print("AT+CIPSEND=");
    wifi.println(cmd.length());
    if (wifi.find(">"))
    {
        //Serial.print(">");
    }
    else
    {
        wifi.println("AT+CIPCLOSE");
        Serial.println("Koneksi Timeout");
        delay(1000);
        return;
    }
    wifi.print(cmd);
    delay(100);
    unsigned long startTime = millis();
    //  char c = wifi.read();
    //  Serial.write(c);
    String test = "";
    while ((millis() - startTime) < 1000)
    {
        while (wifi.available())

        {
            // while(wifi.find('a')) {

            //wifi.find(":");
            String c = wifi.readStringUntil('\r\n');

            test += c;
            // }

            //return test;
        }
    }

    Serial.println(test);
//    Serial.println(test[40]); //lampu bagian 1
//    Serial.println(test[48]); // lampu bagian 2
//    Serial.println(test[56]); // lampu bagian 3
//    Serial.println(test[64]); // tirai
//    Serial.println(test[72]); // kipas
    char test1[] = "11111";
    char test2[] = "00000";
    
    if (test[40] == test1[0])
    {
        digitalWrite(ledPin9, HIGH);
        digitalWrite(ledPin8, HIGH);
        digitalWrite(ledPin7, HIGH);
        //    //turn on led baris 1
    }
    //  //Serial.println(test[0]);
    if (test[48] == test1[1])
    {
        digitalWrite(ledPin6, HIGH);
        digitalWrite(ledPin5, HIGH);
        digitalWrite(ledPin4, HIGH);
        //turn on led baris 2
    }
    if (test[56] == test1[2])
    {
        digitalWrite(ledPin3, HIGH);
        digitalWrite(ledPin2, HIGH);
        digitalWrite(ledPin1, HIGH);
    }
    delay(100);
    if (test[40] == test2[0])
    {
        digitalWrite(ledPin9, LOW);
        digitalWrite(ledPin8, LOW);
        digitalWrite(ledPin7, LOW);
    }
    if (test[48] == test2[1])
    {
        digitalWrite(ledPin6, LOW);
        digitalWrite(ledPin5, LOW);
        digitalWrite(ledPin4, LOW);
    }
    if (test[56] == test2[2])
    {
        digitalWrite(ledPin3, LOW);
        digitalWrite(ledPin2, LOW);
        digitalWrite(ledPin1, LOW);
    }
    if (test[72] == test1[0])
    {
        servo.attach(A0);
        servo.write(60, 10, true);
        servo.detach();
    }
    if (test[64] == test2[0])
    {
        servo.attach(A0);
        servo.write(0, 10, true);
        servo.detach();
    }
    
    if (test[72] == test1[0])
    {
        digitalWrite(relay, HIGH);
    }
    if (test[72] == test2[0])
    {
        digitalWrite(relay, LOW);
    }
}
void connect_to_wifi()
{
    wifi.println("AT+CWMODE=1");
    String cmd = "AT+CWJAP=\"";
    cmd += nama_wifi;
    cmd += "\",\"";
    cmd += pass_wifi;
    cmd += "\"";
    wifi.println(cmd);
    //Serial.println(cmd);
    if (wifi.find("OK"))
    {
        Serial.println("Berhasil Terkoneksi ke internet");
        connected = true;
    }
    else
    {
        Serial.println("Gagal Terkoneksi");
        connected = false;
    }
}