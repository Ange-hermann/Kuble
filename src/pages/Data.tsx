import { Database, BarChart3, GitBranch, Brain, FileSpreadsheet, Activity } from 'lucide-react';
import ServicePageTemplate from '../components/ServicePageTemplate';
import { COLORS } from '../theme/colors';

export default function Data() {
  return (
    <ServicePageTemplate
      config={{
        badge: 'DATA & ANALYTICS',
        title: "Transformer la donnée en décisions",
        subtitle: 'Big Data · Business Intelligence · Data Engineering',
        description: "Vos données recèlent des trésors. Nous construisons les pipelines, les entrepôts et les dashboards qui transforment vos données brutes en insights actionnables.",
        icon: Database,
        accentColor: COLORS.cyan,
        features: [
          { icon: Database, title: 'Data Engineering', desc: 'Pipelines ETL/ELT, entrepôts de données, lakes, qualité et gouvernance de la donnée.' },
          { icon: BarChart3, title: 'Business Intelligence', desc: 'Dashboards interactifs, KPIs en temps réel, reporting automatisé, data visualization.' },
          { icon: GitBranch, title: 'Data Pipelines', desc: 'Apache Airflow, dbt, Kafka — orchestration et streaming de données à grande échelle.' },
          { icon: Brain, title: 'Analytics Avancés', desc: 'Statistiques prédictives, segmentation, cohort analysis, attribution modeling.' },
          { icon: FileSpreadsheet, title: 'Reporting & Export', desc: 'Rapports automatisés, exports Excel/PDF, API de données, partage sécurisé.' },
          { icon: Activity, title: 'Real-time Monitoring', desc: 'Métriques live, alertes intelligentes, anomaly detection, observabilité data.' },
        ],
        steps: [
          { num: '01', title: 'Audit Data', desc: 'Inventaire des sources, qualité, volume, fréquence — cartographie complète.' },
          { num: '02', title: 'Architecture & Pipeline', desc: 'Conception du data warehouse, pipelines ETL, modélisation dimensionnelle.' },
          { num: '03', title: 'Dashboards & Insights', desc: 'Visualisations sur mesure, KPIs métier, accès self-service pour les équipes.' },
          { num: '04', title: 'Optimisation Continue', desc: 'Performance des requêtes, coût cloud, fraîcheur des données, évolutivité.' },
        ],
        stack: ['Python', 'SQL', 'Apache Spark', 'Airflow', 'dbt', 'Snowflake', 'BigQuery', 'PostgreSQL', 'Tableau', 'Power BI', 'Metabase', 'Kafka'],
        stats: [
          { value: '10TB+', label: 'Données traitées/jour' },
          { value: '99.5%', label: 'Data quality score' },
          { value: '< 5min', label: 'Latence temps réel' },
          { value: '40+', label: 'Dashboards déployés' },
        ],
      }}
    />
  );
}
