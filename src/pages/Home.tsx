import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import { useEffect, useState } from "react";
import useApi, { SearchResult, SearchType } from "../hooks/newApi";
import "./Home.css";
import {
  gameControllerOutline,
  tvOutline,
  videocamOutline,
} from "ionicons/icons";
interface SearchResponse {
  Search?: SearchResult[];
  Error?: string;
}

const Home: React.FC = () => {
  const { searchData } = useApi();

  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState<SearchResult[]>([]); 
  const [error, setError] = useState<string | null>(null); 
  const [presentAlert] = useIonAlert();
  const [loading, dismiss] = useIonLoading();

  useEffect(() => {
    const loadData = async () => {
      if (searchTerm.trim() === "") {
        setResults([]); 
        setError(null); 
        return;
      }
      try {
        const res: SearchResponse = await searchData(searchTerm, type);
        await loading();
        if (res.Search) {
          setResults(res.Search); 
          setError(null); 
          await dismiss();
          console.log(res)
        } else if (res.Error) {
          setResults([]); 
          setError(res.Error); 
          await dismiss();
          presentAlert(res.Error);
        }
      } catch (fetchError) {
        console.error("Error fetching search results:", fetchError);
        setResults([]); 
        setError("An unexpected error occurred. Please try again."); 
      }
    };
    loadData();
  }, [searchTerm, type]); 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>My Movie App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          value={searchTerm}
          debounce={300}
          onIonChange={(e) => setSearchTerm(e.detail.value || "")} 
        />
        <IonItem>
          <IonLabel>Select search type</IonLabel>
          <IonSelect
            value={type}
            onIonChange={(e) => setType(e.detail.value as SearchType)} 
          >
            <IonSelectOption value={SearchType.all}>All</IonSelectOption>
            <IonSelectOption value={SearchType.movie}>Movies</IonSelectOption>
            <IonSelectOption value={SearchType.series}>Series</IonSelectOption>
            <IonSelectOption value={SearchType.game}>
              Games
            </IonSelectOption>
          </IonSelect>
        </IonItem>
        {error && <p className="error-message">{error}</p>}{" "}
        {}
        <IonList>
          {results.map((item) => (
            <IonItem button key={item.imdbID} routerLink={`/movies/${item.imdbID}`}>
              <IonAvatar slot="start">
                <IonImg src={item.Poster} alt={item.Title} />
              </IonAvatar>
              <IonLabel className="ion-text-wrap">{item.Title}</IonLabel>
              {item.Type === "movie" && (
                <IonIcon slot="end" icon={videocamOutline}></IonIcon>
              )}
              {item.Type === "series" && (
                <IonIcon slot="end" icon={tvOutline}></IonIcon>
              )}
              {item.Type === "game" && (
                <IonIcon slot="end" icon={gameControllerOutline}></IonIcon>
              )}
            </IonItem> 
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
