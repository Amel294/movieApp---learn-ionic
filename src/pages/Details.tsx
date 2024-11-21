import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter,
  } from "@ionic/react";
  import { starHalfOutline } from "ionicons/icons";
  import React, { useState } from "react";
  import { RouteComponentProps } from "react-router";
  import useApi, { DetailsResult } from "../hooks/newApi";
  
  interface DetailedPageProps extends RouteComponentProps<{ id: string }> {}
  
  const Details: React.FC<DetailedPageProps> = ({ match }) => {
    const { getDetails } = useApi();
    const [details, setDetails] = useState<DetailsResult | null>(null);
  
    useIonViewWillEnter(() => {
      const fetchDetails = async () => {
        try {
          const data = await getDetails(match.params.id);
          setDetails(data);
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      };
      fetchDetails();
    });
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/movies"></IonBackButton>
            </IonButtons>
            <IonTitle>{details?.Genre || "Loading..."}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {details && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{details.Title}</IonCardTitle>
                <IonCardSubtitle>{details.Year}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonImg src={details.Poster} alt={details.Title} />
                <IonItem lines="none">
                  <IonIcon icon={starHalfOutline} slot="start" color="warning" />
                  <IonLabel>{details.imdbRating} / 10</IonLabel>
                </IonItem>
                <p>
                  <strong>Genre:</strong> {details.Genre}
                </p>
                <p>
                  <strong>Director:</strong> {details.Director}
                </p>
                <p>
                  <strong>Actors:</strong> {details.Actors}
                </p>
                <p>
                  <strong>Plot:</strong> {details.Plot}
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a href={details.Website} target="_blank" rel="noopener noreferrer">
                    {details.Website}
                  </a>
                </p>
              </IonCardContent>
            </IonCard>
          )}
        </IonContent>
      </IonPage>
    );
  };
  
  export default Details;
  