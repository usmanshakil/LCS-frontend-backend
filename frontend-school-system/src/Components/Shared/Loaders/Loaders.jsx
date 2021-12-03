import React from 'react';

export function Loaders(props) {
    let { isLoading } = props;
    return (
        <div className={`ui ${isLoading === true ? 'active' : ''} transition visible inverted dimmer`}>
            <div className="content"><div className="ui inverted text loader">Loading</div></div>
        </div>
    )
}

export function sectionLoader(props) {
    let { isLoading } = props;

    return (
        <div className={`ui ${isLoading === true ? 'active' : ''} transition visible inverted dimmer`}>
            <div className="content"><div className="ui inverted text loader">Loading</div></div>
        </div>
    )

}
// showing loader in center of table row
export function TableLoader(props) {
    let { isLoading, columnSpan } = props;
    return (
        <tr className="center aligned">
            <td className="center-table-text capitalize" colSpan={columnSpan}>
                <div className={`ui ${isLoading === true ? 'active' : ''} loader`} />
            </td>

        </tr>
    )
}