#include <Bounce.h>

Bounce button3 = Bounce(13, 50);
Bounce upButton = Bounce(12, 50);
Bounce downButton = Bounce(11, 50);

void setup() {
  // put your setup code here, to run once:
  pinMode(11, INPUT_PULLUP);
  pinMode(12, INPUT_PULLUP);
  pinMode(13, INPUT_PULLUP);
  Keyboard.begin();
}

void loop() {
  if(button3.update()){
    if(button3.fallingEdge()){
      Keyboard.write(32);
    }
  }
  if(upButton.update()){
    if(upButton.fallingEdge()){
      Keyboard.write(218);
    }
  }
  if(downButton.update()){
    if(downButton.fallingEdge()){
      Keyboard.write(217);
    }
  }
}
