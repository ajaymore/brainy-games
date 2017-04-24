import React from 'react';
import ReactPaginate from 'react-paginate';
import { Accordion, Icon, Grid } from 'semantic-ui-react';

const formatDate = (date) => {
    if (!date) {
        return '';
    }
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ', ' + year;
}

const Archive = ({ archive, archiveIndex, perPageItemCount, handlePageClick }) => {

    const slice = archive.slice(archiveIndex * perPageItemCount, (archiveIndex * perPageItemCount + perPageItemCount));
    const panels = slice.map((item, key) => {
        const completionDate = item.completionDate ? new Date(JSON.parse(item.completionDate)) : '';
        return [
            <Accordion.Title>
                <Icon name='dropdown' /><p style={{ display: 'inline-block', marginBottom: 2 }}>Number: {item.randomNum}</p>
                <p style={{ marginLeft: 20, marginBottom: 2 }}>Attempts: {item.trialMap.length}</p>
                <p style={{ marginLeft: 20, marginBottom: 2 }}>Played On: {formatDate(completionDate)}</p>
            </Accordion.Title>,
            <Accordion.Content>
                <table className="accordion-table">
                    <tbody>
                        <tr>
                            <th>Number</th><th>Bulls</th><th>Cows</th>
                        </tr>
                        {item.trialMap.map((item, key) => {
                            return <tr key={key}>
                                <td>{item.inputNumber}</td>
                                <td>{item.bulls}</td>
                                <td>{item.cows}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </Accordion.Content>
        ];
    });
    const accordion = <Accordion styled style={{ textAlign: 'left' }}>
        {panels}
    </Accordion>;

    const paginator = (
        <ReactPaginate previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a href="">...</a>}
            breakClassName={"break-me"}
            pageCount={archive.length / perPageItemCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"} />
    );


    return (
        <div style={{ textAlign: 'center', marginTop: 30 }}>
            <h3>Archive</h3>
            <div>
                <Grid columns='equal' textAlign={'center'} style={{ maxWidth: 500, margin: '0 auto' }}>
                    {accordion}
                </Grid>
            </div>
            {paginator}
        </div>
    );
};

export default Archive;