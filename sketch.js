let video;
let poseNet;
let pose;
let skeleton;

let scal;

//swk photo
let swk_head;
let swk_body;
let swk_l_arm;
let swk_l_hand;
let swk_r_arm;
let swk_r_hand;
let swk_l_leg;
let swk_l_feet;
let swk_r_leg;
let swk_r_feet;

function preload() {
  swk_head = loadImage("assets/swk_head.png");
  swk_body = loadImage("assets/swk_body.png");
  swk_l_arm = loadImage("assets/swk_l_arm.png");
  swk_l_hand = loadImage("assets/swk_l_hand.png");
  swk_r_arm = loadImage("assets/swk_r_arm.png");
  swk_r_hand = loadImage("assets/swk_r_hand.png");
  swk_l_leg = loadImage("assets/swk_l_leg.png");
  swk_l_feet = loadImage("assets/swk_l_feet.png");
  swk_r_leg = loadImage("assets/swk_r_leg.png");
  swk_r_feet = loadImage("assets/swk_r_feet.png");
}

function setup() {
  createCanvas(1920, 1080);
  // createCanvas(600, 400);
  background(255, 255, 255);
  video = createCapture(VIDEO);
  // video.size(900, 400);
  video.size(600, 400);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
  // image(swk_head,0,0);
}

function gotPoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

function draw() {
  background(100, 100, 100);

  image(video, 0, 0);





  push();
  // translate(width*0.2,height*0.2);
  // scale(0.5);
  if (pose) {
    //     for (let i = 0; i < pose.keypoints.length; i++) {
    //       let x = pose.keypoints[i].position.x;
    //       let y = pose.keypoints[i].position.y;
    //       // fill(255, 0, 0);
    //       // ellipse(x, y, 16, 16);
    //     }

    //     for (let i = 0; i < skeleton.length; i++) {
    //       let a = skeleton[i][0];
    //       let b = skeleton[i][1];
    //       line(a.position.x, a.position.y, b.position.x, b.position.y);
    //     }

    scal =
    (dist(
      pose.keypoints[2].position.x,
      pose.keypoints[2].position.y,
      pose.keypoints[1].position.x,
      pose.keypoints[1].position.y
    ) *
    8) /
    swk_head.width;


    //l-leg
    if(pose.keypoints[2].score>0.3 && pose.keypoints[1].score>0.3){
      let angleLLeg1 = createVector(
        pose.keypoints[13].position.x - pose.keypoints[11].position.x,
        pose.keypoints[13].position.y - pose.keypoints[11].position.y
      );

      let angleLLeg2 = createVector(0, 10);

      let angleLLeg = angleLLeg2.angleBetween(angleLLeg1);

      let smooth11x =0;
      let smooth11y =0;


      for(let i =0;i<100;i++){
        smooth11x=smooth11x+ pose.keypoints[11].position.x;

        smooth11y=smooth11y+ pose.keypoints[11].position.y;

      }

      let smoothed11x=smooth11x/100;
      let smoothed11y=smooth11y/100;


      push();
      translate(
         smoothed11x ,
         smoothed11y + swk_body.width*1.3
      );

      rotate(angleLLeg);
      scale(scal);
      image(
        swk_l_leg,
        -swk_l_leg.width * 0.5,
        -swk_l_leg.height * 0.05,
        swk_l_leg.width,
        swk_l_leg.height
      );
      pop();
    }

    //l-foot
    if(pose.keypoints[15].score>0.3 && pose.keypoints[13].score>0.3){
      let angleLFoot1 = createVector(
        pose.keypoints[15].position.x - pose.keypoints[13].position.x,
        pose.keypoints[15].position.y - pose.keypoints[13].position.y
      );

      let angleLFoot2 = createVector(0, 10);

      let angleLFoot = angleLFoot2.angleBetween(angleLFoot1);


      let smooth13x =0;
      let smooth13y =0;


      for(let i =0;i<100;i++){
        smooth13x=smooth13x+ pose.keypoints[13].position.x;

        smooth13y=smooth13y+ pose.keypoints[13].position.y;

      }

      let smoothed13x=smooth13x/100;
      let smoothed13y=smooth13y/100;

      push();
      translate(
        smoothed13x,
        smoothed13y+swk_l_leg.height * 1.5
      );

      // fill(0, 255, 0);
      // ellipse(0, 0, 30, 30);

      rotate(angleLFoot-0.1);
      scale(scal);
      image(
        swk_l_feet,
        -swk_l_feet.width * 0.5,
        -swk_l_feet.height*0.1,
        swk_l_feet.width,
        swk_l_feet.height
      );
      pop();
    }



    // r-leg
    if(pose.keypoints[14].score>0.3 && pose.keypoints[12].score>0.3){
      let angleRLeg1 = createVector(
        pose.keypoints[14].position.x - pose.keypoints[12].position.x,
        pose.keypoints[14].position.y - pose.keypoints[12].position.y
      );

      let angleRLeg2 = createVector(0, 10);

      let angleRLeg = angleRLeg2.angleBetween(angleRLeg1);


      let smooth12x =0;
      let smooth12y =0;


      for(let i =0;i<100;i++){
        smooth12x=smooth12x+ pose.keypoints[12].position.x;

        smooth12y=smooth12y+ pose.keypoints[12].position.y;

      }

      let smoothed12x=smooth12x/100;
      let smoothed12y=smooth12y/100;



      push();
      translate(
        smoothed12x ,
        smoothed12y + swk_body.width * 1.3
      );

      rotate(angleRLeg);
      scale(scal);
      image(
        swk_r_leg,
        -swk_r_leg.width * 0.5,
        -swk_r_leg.height * 0.05,
        swk_r_leg.width,
        swk_r_leg.height
      );
      pop();
    }



    //r-foot
    if(pose.keypoints[16].score>0.3 && pose.keypoints[14].score>0.3){
      let angleRFoot1 = createVector(
        pose.keypoints[16].position.x - pose.keypoints[14].position.x,
        pose.keypoints[16].position.y - pose.keypoints[14].position.y
      );

      let angleRFoot2 = createVector(0, 10);

      let angleRFoot = angleRFoot2.angleBetween(angleRFoot1);



      let smooth14x =0;
      let smooth14y =0;


      for(let i =0;i<100;i++){
        smooth14x=smooth14x+ pose.keypoints[14].position.x;

        smooth14y=smooth14y+ pose.keypoints[14].position.y;

      }

      let smoothed14x=smooth14x/100;
      let smoothed14y=smooth14y/100;


      push();
      translate(
        smoothed14x,
        smoothed14y+swk_l_leg.height*1.5
      );

      // fill(0, 255, 0);
      // ellipse(0, 0, 30, 30);

      rotate(angleRFoot-0.1);
      scale(scal);
      image(
        swk_r_feet,
        -swk_r_feet.width * 0.5,
        -swk_r_feet.height*0.1,
        swk_r_feet.width,
        swk_r_feet.height
      );
      pop();
    }

     //head
    if(pose.keypoints[2].score>0.3 && pose.keypoints[1].score>0.3){
      let angleHead1 = createVector(
        pose.keypoints[2].position.x - pose.keypoints[1].position.x,
        pose.keypoints[2].position.y - pose.keypoints[1].position.y
      );

      let angleHead2 = createVector(10, 0);

      let angleHead = angleHead2.angleBetween(angleHead1);

      // console.log(angleHead);

      let smooth5x =0;
      let smooth6x =0;
      let smooth5y =0;
      let smooth6y =0;


      for(let i =0;i<100;i++){
        smooth5x=smooth5x+ pose.keypoints[5].position.x;
        smooth6x=smooth6x+ pose.keypoints[6].position.x;
        smooth5y=smooth5x+ pose.keypoints[5].position.y;
        smooth6y=smooth6x+ pose.keypoints[6].position.y;
      }

      let smoothed5x=smooth5x/100;
      let smoothed6x=smooth6x/100;
      let smoothed5y=smooth5y/100;
      let smoothed6y=smooth6y/100;


      push();
      translate(
        (smoothed5x + smoothed6x) / 2,
        (smoothed5y + smoothed6y) / 2
      );
      rotate(angleHead);
      scale(scal);
      image(swk_head, -swk_head.width * 0.6, 0, swk_head.width, swk_head.height);
      // fill(0, 255, 0);
      // ellipse(0, 0, 30, 30);
      pop();

    }


    //body
    if(pose.keypoints[6].score>0.3 && pose.keypoints[5].score>0.3){
      let anglebody1 = createVector(
        pose.keypoints[6].position.x - pose.keypoints[5].position.x,
        pose.keypoints[6].position.y - pose.keypoints[5].position.y
      );

      let anglebody2 = createVector(10, 0);

      let angleBody = anglebody2.angleBetween(anglebody1);


      let smooth5x =0;
      let smooth6x =0;
      let smooth5y =0;
      let smooth6y =0;


      for(let i =0;i<100;i++){
        smooth5x=smooth5x+ pose.keypoints[5].position.x;
        smooth6x=smooth6x+ pose.keypoints[6].position.x;
        smooth5y=smooth5x+ pose.keypoints[5].position.y;
        smooth6y=smooth6x+ pose.keypoints[6].position.y;
      }

      let smoothed5x=smooth5x/100;
      let smoothed6x=smooth6x/100;
      let smoothed5y=smooth5y/100;
      let smoothed6y=smooth6y/100;


      // console.log(angleHead);
      push();
      translate(
       (smoothed5x + smoothed6x) / 2,
        (smoothed5y + smoothed6y) / 2
      );
      rotate(PI + angleBody);
      scale(scal);
      image(
        swk_body,
        -swk_body.width / 2,
        -swk_body.height * 0.1,
        swk_body.width,
        swk_body.height
      );
      pop();
    }


    // l-arm
    if(pose.keypoints[7].score>0.3 && pose.keypoints[5].score>0.3){
      let angleLArm1 = createVector(
        pose.keypoints[7].position.x - pose.keypoints[5].position.x,
        pose.keypoints[7].position.y - pose.keypoints[5].position.y
      );

      let angleLArm2 = createVector(0, 10);

      let angleLArm = angleLArm2.angleBetween(angleLArm1);

       let smooth5x =0;
      let smooth6x =0;
      let smooth5y =0;
      let smooth6y =0;


      for(let i =0;i<100;i++){
        smooth5x=smooth5x+ pose.keypoints[5].position.x;
        smooth6x=smooth6x+ pose.keypoints[6].position.x;
        smooth5y=smooth5x+ pose.keypoints[5].position.y;
        smooth6y=smooth6x+ pose.keypoints[6].position.y;
      }

      let smoothed5x=smooth5x/100;
      let smoothed6x=smooth6x/100;
      let smoothed5y=smooth5y/100;
      let smoothed6y=smooth6y/100;

      push();
      translate(
     (smoothed5x + smoothed6x) / 2,
        (smoothed5y + smoothed6y) / 2
      );

      rotate(angleLArm);
      scale(scal);
      image(
        swk_l_arm,
        -swk_l_arm.width * 0.2,
        -swk_l_arm.height * 0.05,
        swk_l_arm.width,
        swk_l_arm.height
      );
      pop();
    }

    // r-arm
    if(pose.keypoints[8].score>0.3 && pose.keypoints[6].score>0.3){
      let angleRArm1 = createVector(
        pose.keypoints[8].position.x - pose.keypoints[6].position.x,
        pose.keypoints[8].position.y - pose.keypoints[6].position.y
      );

      let angleRArm2 = createVector(0, 10);

      let angleRArm = angleRArm2.angleBetween(angleRArm1);

            let smooth5x =0;
      let smooth6x =0;
      let smooth5y =0;
      let smooth6y =0;


      for(let i =0;i<100;i++){
        smooth5x=smooth5x+ pose.keypoints[5].position.x;
        smooth6x=smooth6x+ pose.keypoints[6].position.x;
        smooth5y=smooth5x+ pose.keypoints[5].position.y;
        smooth6y=smooth6x+ pose.keypoints[6].position.y;
      }

      let smoothed5x=smooth5x/100;
      let smoothed6x=smooth6x/100;
      let smoothed5y=smooth5y/100;
      let smoothed6y=smooth6y/100;

      push();
      translate(
           (smoothed5x + smoothed6x) / 2,
        (smoothed5y + smoothed6y) / 2
      );

      rotate(angleRArm);
      scale(scal);
      image(
        swk_r_arm,
        -swk_r_arm.width * 0.2,
        -swk_r_arm.height * 0.05,
        swk_r_arm.width,
        swk_r_arm.height
      );
      pop();
    }

    // l-hand
    if(pose.keypoints[9].score>0.3 && pose.keypoints[7].score>0.3){
      let angleLHand1 = createVector(
        pose.keypoints[9].position.x - pose.keypoints[7].position.x,
        pose.keypoints[9].position.y - pose.keypoints[7].position.y
      );

      let angleLHand2 = createVector(0, 10);

      let angleLHand = angleLHand2.angleBetween(angleLHand1);


       let smooth7x =0;
      let smooth7y =0;


      for(let i =0;i<100;i++){
        smooth7x=smooth7x+ pose.keypoints[7].position.x;

        smooth7y=smooth7y+ pose.keypoints[7].position.y;

      }

      let smoothed7x=smooth7x/100;
      let smoothed7y=smooth7y/100;

      push();
      translate(smoothed7x-swk_body.width*0.05, smoothed7y+swk_body.height*0.4);
      // fill(0, 255, 0);
      // ellipse(0, 0, 30, 30);
      scale(scal);
      rotate(-PI * 2 + angleLHand);
      image(
        swk_l_hand,
        -swk_l_hand.width * 0.45,
        swk_l_hand.height * 0.04,
        swk_l_hand.width,
        swk_l_hand.height
      );
      pop();
    }

    // r-hand
    if(pose.keypoints[10].score>0.3 && pose.keypoints[8].score>0.3){
      let angleRHand1 = createVector(
        pose.keypoints[10].position.x - pose.keypoints[8].position.x,
        pose.keypoints[10].position.y - pose.keypoints[8].position.y
      );

      let angleRHand2 = createVector(0, 10);

      let angleRHand = angleRHand2.angleBetween(angleRHand1);

        let smooth8x =0;
      let smooth8y =0;


      for(let i =0;i<100;i++){
        smooth8x=smooth8x+ pose.keypoints[8].position.x;

        smooth8y=smooth8y+ pose.keypoints[8].position.y;

      }

      let smoothed8x=smooth8x/100;
      let smoothed8y=smooth8y/100;


      push();
      translate(
        smoothed8x + swk_body.width*0.05,
         smoothed8y+swk_body.height*0.5
      );

      // fill(0, 255, 0);
      // ellipse(0, 0, 30, 30);
      scale(scal);
      rotate(-PI * 2 + angleRHand);
      image(
        swk_r_hand,
        -swk_r_hand.width * 0.5,
        swk_r_hand.height * 0.05,
        swk_r_hand.width,
        swk_r_hand.height
      );
      pop();
    }

  }
  pop();
}
