import React, {PureComponent, PropTypes} from 'react';
import {EVENT_PROP_TYPE} from './constants';
import {MINUTES_HOUR, SECONDS_MINUTE, MILLISECONDS_SECOND} from '../utils/constants';

import './TimeSlotEvent.css';

export default class TimeSlotEvent extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onSelect: PropTypes.func.isRequired,
    }

    render() {
        let {
            event: {title, color, start, hours},
            onSelect,
        } = this.props;

        // Compute end time of event based on event length
        let eventEnd = start + hours * (MINUTES_HOUR * SECONDS_MINUTE * MILLISECONDS_SECOND);

        // Define default time-slot class names
        let timeSlotClassNames = `time-slot-event time-slot-event--${color}`;

        // Event is in past if event end time has occurred, so display faded out
        if (eventEnd < Date.now()) {
            timeSlotClassNames = `${timeSlotClassNames} time-slot-event--past`;
        }

        return (
            <button className={timeSlotClassNames} onClick={onSelect}>
                {title}
            </button>
        );
    }
}
