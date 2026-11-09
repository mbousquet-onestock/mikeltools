<?php
/**
 * Symbiose Mobilité – traitement des formulaires (contact et enquête de satisfaction).
 * Compatible hébergement OVH mutualisé (PHP 8+, fonction mail()).
 * Aucun service tiers : anti-spam par champ piège + délai minimal de saisie.
 */
declare(strict_types=1);

const DESTINATAIRE = 'contact@symbiose-mobilite.com';
const EXPEDITEUR   = 'site@symbiose-mobilite.com'; // adresse du domaine (requis par OVH pour la délivrabilité)
const DELAI_MIN_MS = 3000;

function redirige(string $page): never {
    header('Location: /' . $page . '/', true, 303);
    exit;
}

function champ(string $nom, int $max = 200): string {
    $v = trim((string)($_POST[$nom] ?? ''));
    $v = str_replace(["\r", "\0"], '', $v);
    return mb_substr($v, 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    redirige('nous-contacter');
}

// Anti-spam : champ piège rempli ou envoi trop rapide => on fait semblant d'accepter.
$t = (int)($_POST['t'] ?? 0);
$maintenant = (int)round(microtime(true) * 1000);
if (champ('site_web') !== '' || ($t > 0 && $maintenant - $t < DELAI_MIN_MS)) {
    redirige('merci');
}

$formulaire = champ('formulaire', 20) === 'enquete' ? 'enquete' : 'contact';
$nom    = champ('nom', 100);
$prenom = champ('prenom', 100);
$email  = filter_var(champ('email', 200), FILTER_VALIDATE_EMAIL);

if ($nom === '' || $prenom === '' || !$email || champ('rgpd', 3) !== 'oui') {
    redirige('erreur');
}

$lignes = [];
if ($formulaire === 'contact') {
    $message = champ('message', 5000);
    $tel     = champ('telephone', 30);
    if ($message === '' || $tel === '' || champ('profil') === '' || champ('objet') === '') {
        redirige('erreur');
    }
    $sujet = 'Site web – ' . champ('objet', 60) . ' – ' . $prenom . ' ' . $nom;
    $lignes = [
        'Profil'     => champ('profil'),
        'Objet'      => champ('objet'),
        'Nom'        => $nom,
        'Prénom'     => $prenom,
        'Société'    => champ('societe'),
        'E-mail'     => $email,
        'Téléphone'  => $tel,
        'Newsletter' => champ('newsletter', 3) === 'oui' ? 'oui' : 'non',
        'Message'    => "\n" . $message,
    ];
} else {
    $notes = [
        'note_globale' => 'Satisfaction générale',
        'note_accueil' => 'Accueil et présentation',
        'note_reactivite' => 'Réactivité 1er échange',
        'note_suivi' => 'Écoute et suivi',
        'note_expertise' => 'Expertise et conseils',
        'note_recrutement' => 'Profils (recrutement)',
        'note_impatriation' => 'Impatriation',
        'note_logement' => 'Logements et visites',
        'note_recommandation' => 'Recommandation',
    ];
    $sujet = 'Enquête de satisfaction – ' . $prenom . ' ' . $nom;
    $lignes = ['Nom' => $nom, 'Prénom' => $prenom, 'E-mail' => $email];
    foreach ($notes as $cle => $libelle) {
        $n = (int)champ($cle, 1);
        $lignes[$libelle] = ($n >= 1 && $n <= 5) ? $n . ' / 5' : '—';
    }
    $lignes['Améliorations']        = "\n" . champ('ameliorations', 3000);
    $lignes['Témoignage']           = "\n" . champ('temoignage', 3000);
    $lignes['Publication acceptée'] = champ('publication', 3) === 'oui' ? 'oui' : 'non';
    $lignes['Newsletter']           = champ('newsletter', 3) === 'oui' ? 'oui' : 'non';
}

$corps = '';
foreach ($lignes as $k => $v) {
    $corps .= $k . ' : ' . $v . "\n";
}
$corps .= "\n--\nEnvoyé depuis symbiose-mobilite.com le " . date('d/m/Y à H:i') . "\n";

$entetes = [
    'From'         => 'Site Symbiose Mobilité <' . EXPEDITEUR . '>',
    'Reply-To'     => $email,
    'Content-Type' => 'text/plain; charset=UTF-8',
    'MIME-Version' => '1.0',
];

$ok = mail(
    DESTINATAIRE,
    '=?UTF-8?B?' . base64_encode($sujet) . '?=',
    $corps,
    $entetes,
    '-f' . EXPEDITEUR
);

redirige($ok ? 'merci' : 'erreur');
