import { LinkButton } from "@/components/ui/LinkButton";
import { Icon } from "@/components/ui/icons";
import styles from "@/components/sections/pages.module.css";

export default function NotFound() {
  return (
    <div className={styles.status}>
      <span className={styles.statusIcon}>
        <Icon name="searchCheck" size={30} />
      </span>
      <span className={styles.statusCode}>404</span>
      <h1>Esta página no existe.</h1>
      <p>Pudo cambiar de dirección o nunca estuvo disponible. Vuelve al inicio y te llevamos a donde necesitas.</p>
      <LinkButton href="/" icon="arrowLeft" variant="secondary">
        Volver al inicio
      </LinkButton>
    </div>
  );
}
