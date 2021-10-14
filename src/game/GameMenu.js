import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    menuWrapper: ({ multiplier }) => ({
        fontFamily: '"Press Start 2P"',
        fontSize: `${10 * multiplier}px`,
        textTransform: 'uppercase',
        position: 'absolute',
        transform: 'translate(-50%, 0%)',
    }),
    menuPositionWrapper: ({ multiplier, position, width, height }) => {
        const left = window.innerWidth - (width * multiplier);
        const menuWidth = 160 * multiplier;
        if (position === 'center') {
            return {
                minWidth: `${menuWidth}px`,
                left: '50%',
                top: `${(height * multiplier) / 2}px`,
            };
        }

        if (position === 'left') {
            return {
                minWidth: `${menuWidth}px`,
                left: `${(95 * multiplier) + left / 2}px`,
                top: `${50 * multiplier}px`,
            };
        }

        return {};
    },
    menuItemsWrapper: {
        textAlign: 'center',
        padding: 0,
    },
    menuItem: ({ multiplier }) => ({
        cursor: 'pointer',
        listStyle: 'none',
        padding: `${5 * multiplier}px`,
        marginBottom: `${5 * multiplier}px`,
        backgroundColor: '#94785c',
        border: `${multiplier}px solid #79584f`,
    }),
    selectedMenuItem: ({ multiplier }) => ({
        fontSize: `${11 * multiplier}px`,
        border: `${multiplier}px solid #ddd`,
    }),
}));

const GameMenu = ({
    items,
    position = 'center',
    gameSize,
    onSelected,
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
        position,
    });

    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    useEffect(() => {
        const handleKeyPressed = (e) => {
            switch (e.code) {
                case 'Enter': {
                    onSelected(items[selectedItemIndex]);
                    break;
                }

                case 'ArrowUp': {
                    if (selectedItemIndex > 0) {
                        setSelectedItemIndex(
                            selectedItemIndex - 1
                        );
                    }

                    break;
                }

                case 'ArrowDown': {
                    if (items.length - 1 > selectedItemIndex) {
                        setSelectedItemIndex(
                            selectedItemIndex + 1
                        );
                    }

                    break;
                }

                default: {
                    break;
                }
            }
        };
        window.addEventListener('keydown', handleKeyPressed);

        return () => window.removeEventListener('keydown', handleKeyPressed);
    }, [items, onSelected, selectedItemIndex]);

    return (
        <div className={classNames(classes.menuWrapper, classes.menuPositionWrapper)}>
            <ul className={classes.menuItemsWrapper}>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={classNames(classes.menuItem, {
                            [classes.selectedMenuItem]: selectedItemIndex === index,
                        })}
                        onMouseEnter={() => {
                            setSelectedItemIndex(index);
                        }}
                        onClick={() => {
                            onSelected(items[selectedItemIndex]);
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameMenu;
