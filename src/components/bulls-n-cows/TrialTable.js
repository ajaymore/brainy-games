import React from 'react';
import { Grid } from 'semantic-ui-react';

const ResultModal = ({ trialMap }) => {
    return (
        <Grid columns='equal' textAlign={'center'} style={{ maxWidth: 500, margin: '0 auto' }}>

            <Grid.Row className="gray-3-border-top">
                <Grid.Column><h4>Number</h4></Grid.Column>
                <Grid.Column><h4>Bulls</h4></Grid.Column>
                <Grid.Column><h4>Cows</h4></Grid.Column>
            </Grid.Row>

            {trialMap.slice(0).reverse().map((item, key) => {
                return (
                    <Grid.Row key={key} className="gray-3-border-bottom">
                        <Grid.Column>{item.inputNumber}</Grid.Column>
                        <Grid.Column>{item.bulls}</Grid.Column>
                        <Grid.Column>{item.cows}</Grid.Column>
                    </Grid.Row>
                );
            })}
        </Grid>
    );
};

export default ResultModal;