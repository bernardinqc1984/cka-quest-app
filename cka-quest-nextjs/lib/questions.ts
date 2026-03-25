export type Question = {
  q: string;
  options: string[];
  answer: number;
  xp: number;
  explanation: string;
};

export type Domain = {
  id: string;
  icon: string;
  color: string;
  name: string;
  questions: Question[];
};

export const DOMAINS: Domain[] = [
  {
    id: "storage",
    icon: "💾",
    color: "#818cf8",
    name: "Storage (10%)",
    questions: [
      { q: "Tu dois créer un volume persistant de 2Gi en hostPath '/srv/app-data'. Quelle ressource définis-tu d'abord ?", options: ["PersistentVolume", "PersistentVolumeClaim", "VolumeSnapshot", "StatefulSet"], answer: 0, xp: 14, explanation: "Le PV est la ressource cluster représentant le stockage disponible. Le PVC vient ensuite pour le consommer." },
      { q: "Quel champ d'un PVC permet de cibler une classe de stockage dynamique ?", options: ["spec.volumeMode", "spec.storageClassName", "spec.resourcesClass", "spec.provisioner"], answer: 1, xp: 14, explanation: "Le champ 'spec.storageClassName' indique la StorageClass qui pilotera le provisionnement dynamique." },
      { q: "Un PVC est en Pending alors qu'un PV libre existe. Quelle incompatibilité est la plus probable ?", options: ["Namespace différent", "Nom du Pod incorrect", "Modes d'accès ou capacité incompatibles", "ImagePullPolicy erronée"], answer: 2, xp: 18, explanation: "Le binding PVC/PV vérifie notamment la capacité demandée et les accessModes compatibles." },
      { q: "Tu supprimes un PVC lié à un PV avec reclaimPolicy 'Retain'. Que devient le PV ?", options: ["Supprimé avec ses données", "Toujours présent, données conservées", "Converti en ConfigMap", "Remis automatiquement en Available et vidé"], answer: 1, xp: 18, explanation: "Avec Retain, le PV et ses données sont conservés pour traitement manuel." },
      { q: "Quelle commande est correcte pour créer un PVC à partir d'un fichier YAML ?", options: ["kubectl apply -f pvc.yaml", "kubectl mount pvc.yaml", "kubectl create volume -f pvc.yaml", "kubectl attach -f pvc.yaml"], answer: 0, xp: 12, explanation: "L'approche déclarative standard est 'kubectl apply -f ...' pour créer ou mettre à jour la ressource." },
    ],
  },
  {
    id: "troubleshooting",
    icon: "🔧",
    color: "#f87171",
    name: "Troubleshooting (30%)",
    questions: [
      { q: "Quelle commande affichera les logs du conteneur 'api' dans un Pod multi-conteneurs ?", options: ["kubectl logs <pod> api", "kubectl logs <pod> -c api", "kubectl describe <pod> -c api", "kubectl get logs <pod>/api"], answer: 1, xp: 16, explanation: "Pour un Pod multi-conteneurs, on cible explicitement le conteneur avec '-c <nom>'." },
      { q: "Un nœud est NotReady. Quelle vérification système est prioritaire sur le nœud ?", options: ["systemctl status kubelet", "kubectl rollout status kubelet", "crictl pull kubelet", "kubectl replace node"], answer: 0, xp: 18, explanation: "Le kubelet publie l'état du nœud. Vérifier son statut systemd est la première étape logique." },
      { q: "Un Pod reste Pending. Quelle commande donne la cause la plus directe ?", options: ["kubectl top pod <pod>", "kubectl logs <pod>", "kubectl describe pod <pod>", "kubectl cp <pod>:/tmp"], answer: 2, xp: 18, explanation: "Les événements de 'describe pod' indiquent FailedScheduling, taints, manque CPU/mémoire, etc." },
      { q: "Quelle commande est la plus adaptée pour voir la chronologie des événements du cluster ?", options: ["kubectl get events --sort-by=.metadata.creationTimestamp", "kubectl logs events --tail=100", "kubectl describe events", "kubectl top events"], answer: 0, xp: 20, explanation: "Le tri par timestamp est très utile pour reconstruire la séquence d'un incident." },
      { q: "Tu veux diagnostiquer pressions mémoire/disque sur un nœud. Quelle commande utiliser ?", options: ["kubectl logs node/<node>", "kubectl describe node <node>", "kubectl get node <node> -o name", "kubectl explain node"], answer: 1, xp: 16, explanation: "La section Conditions de 'describe node' montre MemoryPressure, DiskPressure, PIDPressure, etc." },
      { q: "Quel symptôme indique principalement un problème de planification (scheduler) ?", options: ["Pod Running mais non joignable", "Pod en CrashLoopBackOff", "Pods Pending avec évènement FailedScheduling", "Service en type NodePort"], answer: 2, xp: 20, explanation: "FailedScheduling pointe vers des contraintes de scheduling ou des ressources insuffisantes." },
    ],
  },
  {
    id: "workloads",
    icon: "📦",
    color: "#fbbf24",
    name: "Workloads & Scheduling (15%)",
    questions: [
      { q: "Quelle commande met à jour l'image d'un Deployment sans interruption globale ?", options: ["kubectl set image deployment/web web=nginx:1.27", "kubectl replace pod web", "kubectl expose deployment web", "kubectl patch service web"], answer: 0, xp: 16, explanation: "La commande 'set image' sur un Deployment déclenche un rolling update contrôlé." },
      { q: "Quelle commande annule la dernière révision d'un Deployment ?", options: ["kubectl rollout undo deployment/web", "kubectl rollback deployment/web", "kubectl set image --undo web", "kubectl revert deployment/web"], answer: 0, xp: 16, explanation: "'kubectl rollout undo' restaure la révision précédente enregistrée par le Deployment." },
      { q: "Tu dois passer rapidement de 3 à 6 replicas. Quelle commande utiliser ?", options: ["kubectl autoscale deployment api --min=6 --max=6", "kubectl scale deployment api --replicas=6", "kubectl patch deployment api --replicas=6", "kubectl set replicas deployment/api 6"], answer: 1, xp: 12, explanation: "'kubectl scale ... --replicas' est la méthode directe et explicite pour ce besoin." },
      { q: "Quel contrôleur est adapté pour exécuter un agent sur chaque nœud (logs, monitoring) ?", options: ["Deployment", "StatefulSet", "DaemonSet", "Job"], answer: 2, xp: 14, explanation: "DaemonSet garantit un Pod par nœud éligible, idéal pour les agents node-level." },
      { q: "Quelle option est correcte pour générer un manifeste YAML sans créer la ressource ?", options: ["--dry-run=server -o yml", "--render-only", "--dry-run=client -o yaml", "--validate=false -o yaml"], answer: 2, xp: 16, explanation: "'--dry-run=client -o yaml' génère le manifeste localement sans persistance en cluster." },
    ],
  },
  {
    id: "architecture",
    icon: "🏗️",
    color: "#34d399",
    name: "Cluster Architecture (25%)",
    questions: [
      { q: "Quel composant est la source de vérité de l'état du cluster Kubernetes ?", options: ["kube-scheduler", "CoreDNS", "etcd", "kubelet"], answer: 2, xp: 16, explanation: "etcd stocke l'état cluster dans une base clé-valeur distribuée." },
      { q: "Tu prépares une maintenance de nœud en évacuant les Pods applicatifs. Quelle commande est la plus adaptée ?", options: ["kubectl cordon <node>", "kubectl drain <node> --ignore-daemonsets", "kubectl taint <node> maintenance=true:NoSchedule", "kubectl delete node <node>"], answer: 1, xp: 20, explanation: "drain rend le nœud unschedulable et évacue les Pods non DaemonSet." },
      { q: "Quelle phrase décrit correctement 'cordon' vs 'drain' ?", options: ["cordon redémarre kubelet, drain redémarre kube-proxy", "cordon bloque seulement le scheduling, drain bloque + évacue", "cordon supprime le nœud, drain le recrée", "Les deux font exactement la même chose"], answer: 1, xp: 20, explanation: "cordon empêche les nouveaux Pods, drain ajoute l'évacuation des Pods existants." },
      { q: "Quelle commande etcdctl réalise une sauvegarde snapshot ?", options: ["etcdctl snapshot save /backup/etcd.db", "etcdctl dump /backup/etcd.db", "etcdctl backup now /backup/etcd.db", "etcdctl state save /backup/etcd.db"], answer: 0, xp: 18, explanation: "La sous-commande officielle est 'snapshot save' avec les paramètres TLS/endpoints requis." },
      { q: "Quel composant décide sur quel nœud un Pod sera placé ?", options: ["kube-controller-manager", "kube-apiserver", "kube-scheduler", "kube-proxy"], answer: 2, xp: 14, explanation: "Le scheduler évalue contraintes et ressources pour sélectionner le nœud cible." },
      { q: "Avant une montée de version control-plane, quelle commande kubeadm donne le plan d'upgrade ?", options: ["kubeadm upgrade check", "kubeadm upgrade plan", "kubectl upgrade plan", "kubelet --upgrade-plan"], answer: 1, xp: 18, explanation: "'kubeadm upgrade plan' affiche versions disponibles et prérequis." },
    ],
  },
  {
    id: "networking",
    icon: "🌐",
    color: "#c084fc",
    name: "Services & Networking (20%)",
    questions: [
      { q: "Quel type de Service expose un port fixe sur chaque nœud du cluster ?", options: ["ClusterIP", "ExternalName", "NodePort", "Headless"], answer: 2, xp: 15, explanation: "NodePort ouvre un port sur chaque nœud (plage par défaut 30000-32767)." },
      { q: "Quel type de Service est créé par défaut si rien n'est précisé ?", options: ["LoadBalancer", "ClusterIP", "NodePort", "Ingress"], answer: 1, xp: 12, explanation: "Le type par défaut d'un Service Kubernetes est ClusterIP (interne au cluster)." },
      { q: "Quel composant maintient les règles réseau des Services (iptables/ipvs) sur les nœuds ?", options: ["kube-proxy", "kubelet", "CoreDNS", "kubeadm"], answer: 0, xp: 14, explanation: "kube-proxy traduit les Services en règles de forwarding vers les endpoints." },
      { q: "Quel objet permet de limiter explicitement le trafic ingress/egress entre Pods ?", options: ["NetworkPolicy", "ServiceAccount", "PodDisruptionBudget", "ResourceQuota"], answer: 0, xp: 20, explanation: "NetworkPolicy applique des règles de filtrage réseau selon labels et ports." },
      { q: "Quel composant DNS interne résout les noms de Services (ex: mysvc.myns.svc.cluster.local) ?", options: ["dnsmasq", "CoreDNS", "kube-proxy", "etcd-dns"], answer: 1, xp: 14, explanation: "CoreDNS est le serveur DNS standard des clusters Kubernetes modernes." },
      { q: "Quel est le rôle principal d'un Ingress dans Kubernetes ?", options: ["Stocker des certificats secrets", "Planifier les Pods", "Router HTTP/HTTPS vers des Services", "Créer automatiquement des Nodes"], answer: 2, xp: 20, explanation: "Ingress décrit des routes L7 (HTTP/HTTPS) appliquées par un Ingress Controller." },
    ],
  },
  {
    id: "exam-sim",
    icon: "🎯",
    color: "#f472b6",
    name: "Simulation Examen (Bonus)",
    questions: [
      { q: "Tu dois créer un Deployment 'nginx-app' avec nginx:1.11.10-alpine et 3 replicas. Quelle commande génère un YAML sans créer la ressource ?", options: ["kubectl create deploy nginx-app --image=nginx:1.11.10-alpine --dry-run=client -o yaml", "kubectl run nginx-app --image=nginx:1.11.10-alpine --replicas=3", "kubectl apply deploy nginx-app --image=nginx:1.11.10-alpine", "kubectl make deploy nginx-app --image=nginx:1.11.10-alpine"], answer: 0, xp: 20, explanation: "Utilise '--dry-run=client -o yaml' pour générer le manifeste, puis ajoute replicas: 3 avant application." },
      { q: "Après un rolling update de nginx-app vers 1.11.13-alpine, quelle commande revient à la version précédente ?", options: ["kubectl rollout undo deployment/nginx-app", "kubectl rollout restart deployment/nginx-app", "kubectl set image deployment/nginx-app nginx=nginx:latest", "kubectl delete deployment nginx-app && kubectl apply -f backup.yaml"], answer: 0, xp: 20, explanation: "'kubectl rollout undo' annule la dernière révision et restaure la précédente." },
      { q: "Le kubelet du master est tombé. Quelle séquence restaure durablement le service ?", options: ["systemctl restart kubelet && systemctl enable kubelet", "kubectl restart kubelet", "kubeadm reset && kubeadm init", "docker restart kubelet"], answer: 0, xp: 25, explanation: "Le kubelet est un service systemd. Restart + enable couvre la restauration immédiate et au reboot." },
      { q: "Tu dois rendre 'ek8s-node-1' indisponible et replanifier les Pods. Quelle commande correspond ?", options: ["kubectl drain ek8s-node-1 --ignore-daemonsets --delete-emptydir-data --force", "kubectl cordon ek8s-node-1", "kubectl taint node ek8s-node-1 maintenance=true:NoSchedule", "kubectl delete node ek8s-node-1"], answer: 0, xp: 20, explanation: "'drain' cordonne + évacue les Pods. C'est l'action attendue pour maintenance avec replanification." },
      { q: "Comment passer le deployment 'webserver' à 6 replicas ?", options: ["kubectl scale deploy webserver --replicas=6", "kubectl patch deployment webserver -p '{\"spec\":{\"replicas\":6}}'", "kubectl edit deployment webserver", "Toutes ces réponses sont valides"], answer: 3, xp: 15, explanation: "Les trois méthodes fonctionnent ; 'scale' reste la plus rapide en examen." },
      { q: "Créer un Pod busybox qui exécute 'env' et sauvegarder la sortie dans un fichier. Quelle commande est correcte ?", options: ["kubectl run busybox --image=busybox --restart=Never --rm -it -- env > envpod.yaml", "kubectl create pod busybox --image=busybox -- env > envpod.yaml", "kubectl exec busybox -- env > envpod.yaml", "kubectl logs busybox -- env > envpod.yaml"], answer: 0, xp: 15, explanation: "Avec 'run ... --restart=Never --rm -it -- env', tu exécutes env dans un Pod éphémère et rediriges la sortie." },
      { q: "Quelle commande liste tous les Pods triés par nom ?", options: ["kubectl get pods --sort-by=.metadata.name", "kubectl get pods --order-by=name", "kubectl get pods | sort -k1", "kubectl sort pods --by name"], answer: 0, xp: 10, explanation: "'--sort-by=.metadata.name' est la syntaxe kubectl attendue." },
      { q: "Créer un Pod nginx avec le label env=test dans le namespace engineering. Quelle commande est correcte ?", options: ["kubectl run nginx --image=nginx --restart=Never --labels=env=test -n engineering", "kubectl create pod nginx --image=nginx --label env=test --ns engineering", "kubectl apply nginx --label env=test -n engineering", "kubectl expose pod nginx --labels env=test -n engineering"], answer: 0, xp: 15, explanation: "'kubectl run ... --restart=Never --labels ... -n engineering' est l'option impérative standard." },
      { q: "Quel extrait décrit correctement un PV hostPath app-data de 2Gi en ReadWriteMany ?", options: ["kind: PersistentVolume + spec.capacity.storage: 2Gi + spec.accessModes: [ReadWriteMany] + spec.hostPath.path: /srv/app-data", "kind: PersistentVolumeClaim + spec.storage: 2Gi + hostPath", "kind: StorageClass + size: 2Gi + path: /srv/app-data", "kind: Volume + accessMode: ReadWriteMany + path: /srv/app-data"], answer: 0, xp: 20, explanation: "Le PV doit contenir capacity, accessModes et hostPath dans spec." },
      { q: "Sans 'kubectl describe', comment afficher l'image d'un Pod nginx ?", options: ["kubectl get pod nginx -o jsonpath='{.spec.containers[].image}'", "kubectl logs nginx --image", "kubectl top pod nginx --containers", "kubectl get pod nginx -o wide | awk '{print $7}'"], answer: 0, xp: 15, explanation: "jsonpath sur .spec.containers[].image est la méthode précise et portable." },
    ],
  },
  {
    id: "killer-shell",
    icon: "💀",
    color: "#38bdf8",
    name: "Killer Shell Simulator",
    questions: [
      { q: "Un Job doit exécuter une tâche 3 fois au total, avec 2 Pods en parallèle. Quels champs YAML configurer ?", options: ["spec.completions: 3 et spec.parallelism: 2", "spec.replicas: 3 et spec.parallel: 2", "spec.runs: 3 et spec.concurrent: 2", "spec.repeat: 3 et spec.threads: 2"], answer: 0, xp: 20, explanation: "Pour un Job, 'completions' fixe le nombre total de succès attendus et 'parallelism' le nombre d'exécutions simultanées." },
      { q: "Comment définir request mémoire 20Mi et limit mémoire 50Mi sur un conteneur ?", options: ["resources.requests.memory=20Mi et resources.limits.memory=50Mi", "memoryRequest=20Mi et memoryLimit=50Mi", "resources.min.memory=20Mi et resources.max.memory=50Mi", "spec.memory.request=20Mi et spec.memory.limit=50Mi"], answer: 0, xp: 15, explanation: "Les ressources se définissent sous spec.containers[].resources avec sections requests et limits." },
      { q: "Dans un Pod, où déclarer le ServiceAccount 'neptune-sa-v2' ?", options: ["spec.serviceAccountName: neptune-sa-v2", "metadata.serviceAccount: neptune-sa-v2", "spec.containers[].serviceAccount: neptune-sa-v2", "spec.securityContext.serviceAccount: neptune-sa-v2"], answer: 0, xp: 15, explanation: "Le ServiceAccount d'un Pod se configure au niveau spec.serviceAccountName." },
      { q: "Quelle readinessProbe exec vérifie qu'un fichier /tmp/ready existe ?", options: ["readinessProbe.exec.command: ['cat','/tmp/ready']", "readinessProbe.httpGet.path: /tmp/ready", "readinessProbe.tcpSocket.file: /tmp/ready", "readinessProbe.fileCheck: /tmp/ready"], answer: 0, xp: 20, explanation: "Une probe exec exécute une commande dans le conteneur ; code retour 0 = succès." },
      { q: "Pour déplacer un Pod de 'saturn' vers 'neptune', quelle approche est correcte ?", options: ["Exporter le YAML, changer namespace, recréer, supprimer l'ancien", "kubectl move pod <name> -n neptune", "kubectl edit pod et modifier metadata.namespace", "kubectl cp pod saturn/neptune"], answer: 0, xp: 20, explanation: "On ne peut pas changer le namespace d'un Pod existant : il faut recréer la ressource dans le nouveau namespace." },
      { q: "Créer un ConfigMap 'cm-html' avec une clé explicite index.html depuis un fichier local :", options: ["kubectl create configmap cm-html --from-file=index.html=/path/file.html", "kubectl create configmap cm-html --data index.html=/path/file.html", "kubectl apply configmap cm-html --file index.html=/path/file.html", "kubectl create cm-html --from-content /path/file.html"], answer: 0, xp: 15, explanation: "Le flag '--from-file=<key>=<path>' permet de fixer le nom de clé dans le ConfigMap." },
      { q: "Pattern sidecar logs : quel design est correct ?", options: ["Deux conteneurs partageant un volume, sidecar en tail -f", "Un initContainer qui lit les logs en continu", "Un seul conteneur avec deux commandes", "kubectl logs --sidecar"], answer: 0, xp: 25, explanation: "Le pattern sidecar repose sur un volume partagé entre conteneur applicatif et conteneur de collecte." },
      { q: "Où définir les InitContainers dans un Pod ?", options: ["spec.initContainers", "spec.containers.init", "spec.preContainers", "metadata.initContainers"], answer: 0, xp: 15, explanation: "Les initContainers sont déclarés sous spec.initContainers et s'exécutent avant spec.containers." },
      { q: "La commande kubectl expose sans --type crée par défaut quel Service ?", options: ["ClusterIP", "NodePort", "LoadBalancer", "ExternalName"], answer: 0, xp: 10, explanation: "Le type par défaut d'un Service est ClusterIP." },
      { q: "Un Service n'a aucun Endpoint. Cause la plus fréquente ?", options: ["Le selector du Service ne matche aucun label de Pod", "Le Service est en ClusterIP", "Le port targetPort est 80", "Le Pod est Running"], answer: 0, xp: 20, explanation: "Sans correspondance selector/labels, aucun Pod n'est associé et les Endpoints restent vides." },
      { q: "Convertir un Service ClusterIP en NodePort 30100 : méthode fiable ?", options: ["Éditer le Service: spec.type=NodePort + nodePort:30100", "kubectl convert service --type NodePort", "kubectl set type service NodePort", "kubectl expose --nodePort 30100"], answer: 0, xp: 15, explanation: "La voie simple est d'éditer le manifeste du Service pour modifier type et nodePort." },
      { q: "Dans une NetworkPolicy egress, comment autoriser trafic vers Pods api OU DNS:53 ?", options: ["Deux règles egress séparées (OR logique)", "Une seule règle combinant podSelector et ports", "Activer spec.dns=true", "Aucune règle DNS nécessaire"], answer: 0, xp: 25, explanation: "Des entrées egress distinctes permettent un OR logique. Combiner contraintes dans une seule entrée revient à un AND." },
    ],
  },
];

export const totalQuestions = DOMAINS.reduce((acc, d) => acc + d.questions.length, 0);

