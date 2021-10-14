import { GameObjects } from 'phaser';

export const createInteractiveGameObject = (
    scene,
    x,
    y,
    width,
    height,
    name,
    isDebug = false,
    origin = { x: 0, y: 1 }
) => {
    const customCollider = new GameObjects.Rectangle(
        scene,
        x,
        y,
        width,
        height
    ).setOrigin(origin.x, origin.y);
    customCollider.name = name;
    customCollider.isCustomCollider = true;

    if (isDebug) {
        customCollider.setFillStyle(0x741B47);
    }

    scene.physics.add.existing(customCollider);
    customCollider.body.setAllowGravity(false);
    customCollider.body.setImmovable(true);

    return customCollider;
};

export const calculateGameSize = () => {
    let width = 400;
    let height = 224; // 16 * 14 = 224
    const multiplier = Math.min(Math.floor(window.innerWidth / 400), Math.floor(window.innerHeight / 224)) || 1;

    if (multiplier > 1) {
        width += Math.floor((window.innerWidth - width * multiplier) / (16 * multiplier)) * 16;
        height += Math.floor((window.innerHeight - height * multiplier) / (16 * multiplier)) * 16;
    }

    return { width, height, multiplier };
};
