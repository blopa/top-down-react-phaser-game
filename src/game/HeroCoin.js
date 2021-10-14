import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

// Images
import coinImage from './assets/images/coin.png';

const useStyles = makeStyles((theme) => ({
    coinContainer: ({ multiplier, width }) => {
        const left = window.innerWidth - (width * multiplier);
        return {
            fontFamily: '"Press Start 2P"',
            fontSize: `${12 * multiplier}px`,
            textTransform: 'uppercase',
            imageRendering: 'pixelated',
            position: 'absolute',
            top: `${32 * multiplier}px`,
            left: `${(16 * multiplier) + left / 2}px`,
            display: 'flex',
            cursor: 'default',
            userSelect: 'none',
        };
    },
    coin: ({ multiplier, width }) => ({
        backgroundSize: `${16 * multiplier}px ${16 * multiplier}px`,
        background: `url("${coinImage}") no-repeat 0 0`,
        width: `${16 * multiplier}px`,
        height: `${16 * multiplier}px`,
    }),
    coinFull: ({ multiplier }) => {
        const strokeSize = multiplier;
        return {
            fontSize: `${11 * multiplier}px`,
            textShadow: `-${strokeSize}px 0 #FFFFFF, 0 ${strokeSize}px #FFFFFF, ${strokeSize}px 0 #FFFFFF, 0 -${strokeSize}px #FFFFFF`,
            color: '#119923',
        };
    },
}));

const HeroCoin = ({
    gameSize,
    heroCoins,
}) => {
    const {
        width,
        height,
        multiplier,
    } = gameSize;

    const classes = useStyles({
        width,
        height,
        multiplier,
    });

    return (
        <div className={classes.coinContainer}>
            <div className={classes.coin} />
            <span
                className={classNames({
                    [classes.coinFull]: heroCoins >= 999,
                })}
            >
                {heroCoins.toString().padStart(3, '0')}
            </span>
        </div>
    );
};

export default HeroCoin;
