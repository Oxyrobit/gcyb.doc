---
title: VPN
sidebar_position: 4
---

Avoir accès à distance à un réseau

Fonctionnement des VPN's

Créer un tunnel entre le client et le serveur. Les données sont chiffrer de bout en bout

## Type de VPN
- VPN personnel
- VPN d'entreprise
- VPN site à sites

## Niveaux 2
Point to point protocol (PPTP)
Encapscule des paquets PPP dans des datagralles IP avec GRE, Implémenté nativement sur les machines Windows
Layer 2 Tunneling (L2TP)

S'appuie sur le PPP, Ne transporte que des données et leur intégrité. Pas de confidientialité.


## Niveau 3

GRE Encapsulation Générique de Routage (Cisco)
Permet à deux router de créer un tunnel

IPSEc en mode tunnel

## Couche 4
Permet de tunneler des protocoles applicatifs via la restransmission de port

SSTP (Secure Socket Tunneling Protocol)
Pur Microsoft pour les cleints nomades SSL/TTL

## Besoin

Client nomades:
- Windows: SSTP
- Autre: SSH

Connexion sites-à-sites
- IPSec ou OpenVPN


