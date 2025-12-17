import RenderableEntity from "./RenderableEntity.js";
import { CONFIG } from "../config.js";

export default class Player extends RenderableEntity {
    constructor(x, y, width, height) {
        super(x, y, width, height);

        this.mass = width / 16;
        this.physics = {
            gravity: CONFIG.physics.gravity * this.mass,
            accel: CONFIG.physics.accel / this.mass,
            decel: CONFIG.physics.decel / this.mass,
            jumpForce: CONFIG.player.jumpForce / Math.sqrt(this.mass),
            };

        this.vx = 0;
        this.vy = 0;
        this.onGround = false;

        this.el = document.createElement("div");
        this.el.id = "player";
        this.el.style.width = width + "px";
        this.el.style.height = height + "px";

        /*testing LMAO*/
        this.sprite = document.createElement("img");
        this.sprite.src = "assets/pinkbear.png"; 
        this.sprite.draggable = false;
        this.el.appendChild(this.sprite);

    }

    update(input, dt) {
        this.updateHorizontal(input, dt);
        this.handleJump(input);
        this.applyGravity(dt);
        this.applyMovement(dt);
        this.updateSprite(input)
    }

    /*jUST testing an img*/
    updateSprite(input) {
        // direção
        if (input.left) this.facing = "left";
        if (input.right) this.facing = "right";

        // estado
        if (!this.onGround) {
            this.state = "jump";
        } 
        else if (Math.abs(this.vx) > 150) {
            this.state = "run";
        } 
        else if (Math.abs(this.vx) > 5) {
            this.state = "walk";
        } 
        else {
            this.state = "idle";
        }

        // escolher imagem
        let src = "assets/pinkbear.png";

        if (this.state === "jump") src = "assets/jump.png";
        if (this.state === "run") src = "assets/run.png";

        this.sprite.src = src;

        // virar sprite
        if (this.facing === "left") {
            this.sprite.style.transform = "translateX(-50%) scaleX(-1)";
        } else {
            this.sprite.style.transform = "translateX(-50%) scaleX(1)";
        }
        }


    updateHorizontal(input, dt) {
        let targetVx = 0;

        if (input.left) targetVx = -CONFIG.player.maxRunSpeed;
        if (input.right) targetVx = CONFIG.player.maxRunSpeed;

        if (this.vx < targetVx) {
            this.vx += this.physics.accel * dt;
            if (this.vx > targetVx) this.vx = targetVx;
        } 
        else if (this.vx > targetVx) {
            this.vx -= this.physics.decel * dt;
            if (this.vx < targetVx) this.vx = targetVx;
        }
    }

    handleJump(input) {
        if (input.jump && this.onGround) {
            this.vy = this.physics.jumpForce;
            this.onGround = false;
        }
        input.jump = false;
    }

    applyGravity(dt) {
        this.vy += this.physics.gravity * dt;
    }

    applyMovement(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }
}
