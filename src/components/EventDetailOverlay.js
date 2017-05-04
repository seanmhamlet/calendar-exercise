import React, {PureComponent, PropTypes} from 'react';
import {EVENT_PROP_TYPE} from './constants';
import {getDisplayDate, getDisplayHour} from '../utils';

import './EventDetailOverlay.css';
import '../index.css';

export default class EventDetailOverlay extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onClose: PropTypes.func.isRequired
    }

    componentDidMount() {
        document.body.classList.add('no-scroll');

        // Make sure to store bound version so it can be removed later
        this._handleKeyDownBound = this._handleKeyDown.bind(this);
        document.addEventListener('keydown', this._handleKeyDownBound);

        // Make sure to store bound version so it can be removed later
        this._handleClickBound = this._handleClick.bind(this);
        document.addEventListener('mousedown', this._handleClickBound);
    }

    componentWillUnmount() {
        document.body.classList.remove('no-scroll');
        document.removeEventListener('keydown', this._handleKeyDownBound);
        document.removeEventListener('mousedown', this._handleClickBound);
    }

    _handleKeyDown(e) {
        if (e.keyCode === 27) {
            this.props.onClose();
        }
    }

    _handleClick(e) {
        let eventOverlayElement = document.getElementsByClassName('event-detail-overlay')[0];

        let clickInsideEventOverlay = eventOverlayElement.contains(e.target);

        if (!clickInsideEventOverlay) {
            this.props.onClose();
        }
    }

    render() {
        let {event, onClose} = this.props;
        let {title, description, start, color, hours} = event;
        let displayDate = getDisplayDate(start);
        let startHour = (new Date(start)).getHours();

        // TODO: Fix. If hours was other than 1 the UI would break
        let endHour = startHour + hours;

        let startHourDisplay = getDisplayHour(startHour);
        let endHourDisplay = getDisplayHour(endHour);

        let displayDateTime = `${displayDate} ${startHourDisplay} - ${endHourDisplay}`;

        // TODO: Add appropriate ARIA tags to overlay/dialog
        return (
            <section className="event-detail-overlay">
                <div className="event-detail-overlay__container">
                    <button
                        className="event-detail-overlay__close"
                        title="Close detail view"
                        onClick={onClose}
                    />
                    <div>
                        {displayDateTime}
                        <span
                            className={`event-detail-overlay__color event-detail-overlay--${color}`}
                            title={`Event label color: ${color}`}
                        />
                    </div>
                    <h1 className="event-detail-overlay__title">
                        {title}
                    </h1>
                    <p>{description}</p>
                </div>
            </section>
        );
    }
}
