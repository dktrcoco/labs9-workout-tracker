import React, { useContext, useState, useEffect } from "react";
import { Store } from '../../index';
import styled from 'styled-components';



const ProgressDayView = () => {

    const { state, dispatch } = useContext(Store);

    

    const [metrics, setMetrics] = useState(state.metrics)
    const [showDelete, setDelete] = useState(false);
    const [currentMetric, setCurrentMetric] = useState({})

    useEffect(() => {

        const nM = metrics.map(m => {
            const copy = m;

            copy.date = dateParser(m.date);
            console.log(copy);
            return copy;
        });

        const sortedMetrics = nM.sort((a, b) => {
            a = a.date.split('/').reverse().join('')
            b = b.date.split('/').reverse().join('')
            return a > b ? 1 : a < b ? -1 : 0;
        }).reverse();


        setMetrics(sortedMetrics);

    }, [state]);

    const dateParser = date => {
        date = date.split("T")[0].split('-');
    
        return date[0] + "/" + date[1] + "/" + date[2];
    };

    const editMetric = (m) => {

    };

    const deleteCheck = (m) => {
        setCurrentMetric(m);
        setDelete(true);
    };


    return (
        <StyledContainer>
        {
            metrics.map((m, i) => {
                return (
                    <DayItem key={i}>
                        <span>Date: {m.date} </span>
                        <span>Weight:{m.weight} </span>
                        <span>Hips:{m.hips} </span>
                        <span>Waist:{m.waist} </span>
                        <span>LeftArm:{m.arm_left} </span>
                        <span>RightArm:{m.arm_right} </span>
                        <span>LeftLeg:{m.leg_left} </span>
                        <span>RightLeg:{m.leg_right} </span>
                        <StyledIcon onClick={() => editMetric(m)}><i className="fas fa-edit"></i></StyledIcon>
                        <StyledIcon onClick={() => deleteCheck(m)} delete><i className="fas fa-trash-alt"></i></StyledIcon>
                    </DayItem>
                );
            })
        }

        {
        showDelete
            ? (
                <DeleteContainer>
                    <DeleteComponent>
                        <h3>Delete Metric</h3>
                        <div>Date: {currentMetric.date}</div>
                        <DeleteButton type="button">Delete</DeleteButton>
                        <button type="button" onClick={e => setDelete(false)}>Cancel</button>
                    </DeleteComponent>
                </DeleteContainer>
            )
            : null
        }

        </StyledContainer>
    );
}

export default ProgressDayView;

const DeleteButton = styled.button`
    width: 100px;
    height: 35px;
    color: white;
    background-color: ${props => props.theme.primaryDark};
    &:hover {
        color: ${props => props.theme.accent};
    }
`;

const DeleteComponent = styled.div`
    width: 200px;
    height: 200px;
    background: white;
    border-radius: 12px;
    margin: 0 auto;
`;

const DeleteContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    background-color: rgba(0,0,0,0.4);
    padding-top: 200px;
`;

const StyledIcon = styled.span`
    font-size: 18px;
    cursor: pointer;
    color: ${props => props.delete ? 'red' : 'black'};
`;

const StyledContainer = styled.div`
    width: 100%;
`;

 const DayItem = styled.div`
    width: 100%;
    height: 50px;
 `;
