import { Scene } from 'phaser';

export default class MainMenuScene extends Scene {
    constructor() {
        super('GameOverScene');
    }

    preload() {
        // TODO
    }

    create() {
        const fontSize = 24;
        const { width: gameWidth, height: gameHeight } = this.cameras.main;

        const gameOverText = this.add.text(
            gameWidth / 2,
            Math.ceil(gameHeight / 5),
            'game over',
            {
                fontFamily: '"Press Start 2P"',
                fontSize: `${fontSize}px`,
                size: `${fontSize}px`,
                fill: '#ffffff',
                color: '#ffffff',
            }
        ).setDepth(10).setOrigin(0.5, 0.5);

        const scale = Math.max(Math.ceil(gameWidth / 220), Math.ceil(gameHeight / 124));
        this.add.image(0, 0, 'game_over_background')
            .setScale(scale)
            .setDepth(0)
            .setOrigin(0, 0);

        const customEvent = new CustomEvent('menu-items', {
            detail: {
                menuItems: ['game.game_over.retry', 'game.game_over.exit'],
                menuPosition: 'center',
            },
        });

        window.dispatchEvent(customEvent);
        const gameMenuSelectedEventListener = ({ detail }) => {
            switch (detail.selectedItem) {
                case 'game.game_over.retry': {
                    this.scene.start('MainMenuScene');
                    break;
                }

                case 'game.game_over.exit': {
                    window.location.reload();
                    break;
                }

                default: {
                    break;
                }
            }

            window.removeEventListener(
                'menu-item-selected',
                gameMenuSelectedEventListener
            );
        };

        window.addEventListener(
            'menu-item-selected',
            gameMenuSelectedEventListener
        );
    }
}
