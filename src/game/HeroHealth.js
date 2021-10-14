import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

// Images
import healthImage from './assets/images/health.png';

const useStyles = makeStyles((theme) => ({
    healthContainer: ({ multiplier, width }) => {
        const left = window.innerWidth - (width * multiplier);
        return {
            imageRendering: 'pixelated',
            position: 'absolute',
            top: `${16 * multiplier}px`,
            left: `${(16 * multiplier) + left / 2}px`,
            display: 'flex',
        };
    },
    health: ({ multiplier, width }) => ({
        width: `${16 * multiplier}px`,
        height: `${16 * multiplier}px`,
    }),
    healthStateFull: ({ multiplier }) => ({
        backgroundSize: `${48 * multiplier}px ${16 * multiplier}px`,
        background: `url("${healthImage}") no-repeat 0 0`,
    }),
    healthStateHalf: ({ multiplier }) => ({
        backgroundSize: `${48 * multiplier}px ${16 * multiplier}px`,
        background: `url("${healthImage}") no-repeat -${16 * multiplier}px 0`,
    }),
    healthStateEmpty: ({ multiplier }) => ({
        backgroundSize: `${48 * multiplier}px ${16 * multiplier}px`,
        background: `url("${healthImage}") no-repeat -${32 * multiplier}px 0`,
    }),
}));

const HeroHealth = ({
    gameSize,
    healthStates,
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
        <div className={classes.healthContainer}>
            {healthStates.map((healthState, index) => (
                <div
                    key={index}
                    className={classNames(classes.health, {
                        [classes.healthStateFull]: healthState === 'full',
                        [classes.healthStateHalf]: healthState === 'half',
                        [classes.healthStateEmpty]: healthState === 'empty',
                    })}
                />
            ))}
        </div>
    );
};

export default HeroHealth;
