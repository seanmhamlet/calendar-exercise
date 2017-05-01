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

        // Event is in past if event end time has occurred, so display faded out
        let timeSlotPastClass = eventEnd < Date.now() ? 'time-slot-event--past' : '';

        return (
            <button className={`time-slot-event time-slot-event--${color} ${timeSlotPastClass}`} onClick={onSelect}>
                {title}
            </button>
        );
    }
}
