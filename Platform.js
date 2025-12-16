export default class Platform {
    
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.el = document.createElement("div");
        this.el.className = "platform";
        this.el.style.width = width + "px";
        this.el.style.height = height + "px";
    }

    update(worldX) {
        this.el.style.left = (this.x - worldX) + "px";
        this.el.style.top = this.y + "px";
    }

    attach(parent) {
        parent.appendChild(this.el);
    }

    isPlayerLanding(player) {
        const platformTop = this.y;
        const platformLeft = this.x;
        const platformRight = this.x + this.width;

        const playerBottom = player.y + player.size;
        const playerPrevBottom = playerBottom - player.vy;

        const playerLeft = player.x;
        const playerRight = player.x + player.size;

        if (player.vy < 0) return false;

        const crossedTop = playerPrevBottom <= platformTop && playerBottom >= platformTop;

        const horizontallyAligned = playerRight > platformLeft && playerLeft < platformRight;

        return crossedTop && horizontallyAligned;
    }

}
