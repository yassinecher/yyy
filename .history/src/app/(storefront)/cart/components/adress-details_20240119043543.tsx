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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast from 'react-hot-toast';

const CheckoutDialog = ({ data ,totalPrice}: { data: CartItem[],totalPrice:number }) => {
  const [nom, setNom] = useState('');
  const [prenom, setNomUtilisateur] = useState('');
  const [rue, setRue] = useState('');
  const [ville, setVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [moyenPaiement, setMoyenPaiement] = useState('');
  const [email, setemail] = useState('');
  const [telephone, settelephone] = useState('');

  const validateForm = () => {
    // Add your validation logic here
    return nom.trim() !== '' && prenom.trim() !== '' && rue.trim() !== '' && ville.trim() !== '' && codePostal.trim() !== '' && moyenPaiement.trim() !== '';
  };

  const handleSubmit = async () => {
    try {
      // Validate the form before submitting
      if (!validateForm()) {
        console.error('Veuillez remplir tous les champs obligatoires.');
        toast.error('Veuillez remplir tous les champs obligatoires.')
        return;
      }

      // Envoyer les données au serveur ou effectuer d'autres actions
      const response = await axios.post('/api/checkout', {
        nom,
        prenom,
        rue,
        ville,
        codePostal,
        moyenPaiement,
        email,
        telephone,
        totalPrice,
        data,
        articlesPanier: data.filter((e)=>'id'in e),
        pcOrder: data.filter((e)=>'idd'in e),
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
        <DialogContent className="absolute top-0 lg:min-w-[80%] h-screen overflow-y-scroll  min-w-[100%]   ">
          <div className='h-[100vh] '>

          
          <DialogHeader>
            <DialogTitle>Validation de la commande</DialogTitle>
            <DialogDescription>
              Saisissez vos détails pour la validation de la commande. Cliquez sur Enregistrer lorsque vous avez terminé.
            </DialogDescription>
          </DialogHeader>

          <div className='grid  grid-cols-1 sm:grid-cols-2 items-start gap-2'>
            <div>
            <div className="grid gap-4 py-4 ">
                <div className="grid grid-cols-4 items-center gap-4">
              
                <Label htmlFor="nom" className="text-right">
                  Nom*
                </Label>
                <Input
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="col-span-3"
                />
              </div>     </div>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prenom" className="text-right">
                Prénom*
              </Label>
              <Input
                id="prenom"
                value={prenom}
                onChange={(e) => setNomUtilisateur(e.target.value)}
                className="col-span-3"
              />
            </div>  </div>
                       
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nom" className="text-right">
                    Email*
                  </Label>
                  <Input
                  type='email'
                    id="nom"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nom" className="text-right">
                    Numero de téléphone*
                  </Label>
                  <Input
                    id="nom"
                    value={telephone}
                    onChange={(e) => settelephone(e.target.value)}
                    className="col-span-3"
                  />
                </div>
            </div>
   

            <div className="grid gap-4 py-4">

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rue" className="text-right">
                  Rue*
                </Label>
                <Input
                  id="rue"
                  value={rue}
                  onChange={(e) => setRue(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ville" className="text-right">
                  Ville*
                </Label>
                <Input
                  id="ville"
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="codePostal" className="text-right">
                  Code postal*
                </Label>
                <Input
                  id="codePostal"
                  value={codePostal}
                  onChange={(e) => setCodePostal(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="moyenPaiement" className="text-right">
                  Moyen de paiement*
                </Label>
                <Select  onValueChange={setMoyenPaiement} >
                  <SelectTrigger className="w-full col-span-3">
                    <SelectValue className="w-full" placeholder="Moyen de paiement" />
                  </SelectTrigger>
                  <SelectContent className="col-span-3">
                    <SelectGroup>
                      <SelectItem value="apple">à La Livraison</SelectItem>
                      <SelectItem value="banana">Carte Bancaire</SelectItem>
                      <SelectItem value="blueberry">Chèque</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

            </div>
          </div>

          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Valider
            </Button>
          </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutDialog;
