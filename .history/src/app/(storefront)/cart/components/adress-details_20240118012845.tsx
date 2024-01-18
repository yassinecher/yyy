import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CartItem } from '@/hooks/use-cart';
import { Select } from '@nextui-org/react';

const CheckoutDialog = ({ data }: { data: CartItem[] }) => {
  const [nom, setNom] = useState('');
  const [prenom, setNomUtilisateur] = useState('');
  const [rue, setRue] = useState('');
  const [ville, setVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [moyenPaiement, setMoyenPaiement] = useState('');

  const handleSubmit = async () => {
    try {
      // Envoyer les données au serveur ou effectuer d'autres actions
      const response = await axios.post('/api/checkout', {
        nom,
        prenom,
        rue,
        ville,
        codePostal,
        moyenPaiement,
        articlesPanier: data,
      });

      console.log('Validation de la commande réussie :', response.data);

      // Fermer la boîte de dialogue ou naviguer vers l'étape suivante
    } catch (error) {
      console.error('Échec de la validation de la commande :', error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={data.length === 0} className="w-full mt-6">Passer à la caisse</Button>
        </DialogTrigger>
        <DialogContent className="xs:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Validation de la commande</DialogTitle>
            <DialogDescription>
              Saisissez vos détails pour la validation de la commande. Cliquez sur Enregistrer lorsque vous avez terminé.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* ... Autres champs ... */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="moyenPaiement" className="text-right">
                Moyen de paiement
              </Label>
              <select
                id="moyenPaiement"
                value={moyenPaiement}
                onChange={(e) => setMoyenPaiement(e.target.value)}
                className="col-span-3"
              >
                <option value="carteBancaire">Carte Bancaire</option>
                <option value="cheque">Chèque</option>
                <option value="laLivraison" disabled>à La Livraison</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Enregistrer les modifications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutDialog;
