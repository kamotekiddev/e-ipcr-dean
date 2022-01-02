import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { EvaluationCard } from "../components/Cards";

import { getEvaluations } from "../store/evaluations";
import { MyLoader } from "../components";
import moment from "moment";

export default function PastEvaluations({ history }) {
  const { list, loading } = useSelector(getEvaluations);

  const pastEvaluations = list.filter((evaluation) => {
    const isDue = moment(evaluation.due).isAfter(Date.now());
    if (isDue) return;
    return evaluation;
  });

  return (
    <AppContainer>
      <AppHeader>
        <h4 className="m-0">Past Evaluations</h4>
      </AppHeader>
      {loading ? (
        <MyLoader />
      ) : (
        <AppContent>
          {pastEvaluations?.map((evaluation) => (
            <EvaluationCard
              evaluationInfo={evaluation}
              key={evaluation._id}
              onPreview={() =>
                history.push(`/dashboard/evaluations/${evaluation._id}`)
              }
            />
          ))}
        </AppContent>
      )}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 0.5rem;
`;

const AppHeader = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const AppContent = styled.div`
  display: grid;
  gap: 1rem;
`;
