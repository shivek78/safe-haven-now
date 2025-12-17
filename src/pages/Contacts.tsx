import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNavigation, PageHeader } from "@/components/Navigation";
import {
  Plus,
  Phone,
  Mail,
  Trash2,
  Edit,
  Star,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  relationship: string;
  isPrimary: boolean;
}

const initialContacts: Contact[] = [
  {
    id: 1,
    name: "Mom",
    phone: "+1 (555) 123-4567",
    email: "mom@email.com",
    relationship: "Family",
    isPrimary: true,
  },
  {
    id: 2,
    name: "Best Friend - Jess",
    phone: "+1 (555) 234-5678",
    email: "jess@email.com",
    relationship: "Friend",
    isPrimary: false,
  },
  {
    id: 3,
    name: "Partner - Alex",
    phone: "+1 (555) 345-6789",
    email: "alex@email.com",
    relationship: "Partner",
    isPrimary: false,
  },
];

export default function Contacts() {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    relationship: "",
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast({
        title: "Missing information",
        description: "Please provide at least a name and phone number.",
        variant: "destructive",
      });
      return;
    }

    const contact: Contact = {
      id: Date.now(),
      ...newContact,
      isPrimary: contacts.length === 0,
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: "", phone: "", email: "", relationship: "" });
    setIsAddingContact(false);
    toast({
      title: "Contact added",
      description: `${contact.name} has been added to your trusted contacts.`,
    });
  };

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
    toast({
      title: "Contact removed",
      description: "The contact has been removed from your list.",
    });
  };

  const handleSetPrimary = (id: number) => {
    setContacts(
      contacts.map((c) => ({
        ...c,
        isPrimary: c.id === id,
      }))
    );
    toast({
      title: "Primary contact updated",
      description: "This contact will be notified first in emergencies.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero pb-24">
      <PageHeader
        title="Trusted Contacts"
        subtitle="People who'll be notified in emergencies"
        action={
          <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
            <DialogTrigger asChild>
              <Button size="icon" variant="default">
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Trusted Contact</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Contact name"
                    value={newContact.name}
                    onChange={(e) =>
                      setNewContact({ ...newContact, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={newContact.phone}
                    onChange={(e) =>
                      setNewContact({ ...newContact, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={newContact.email}
                    onChange={(e) =>
                      setNewContact({ ...newContact, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Input
                    id="relationship"
                    placeholder="e.g., Family, Friend, Partner"
                    value={newContact.relationship}
                    onChange={(e) =>
                      setNewContact({ ...newContact, relationship: e.target.value })
                    }
                  />
                </div>
                <Button className="w-full" onClick={handleAddContact}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                These contacts will be alerted when you trigger an SOS
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                They'll receive your location and an emergency message
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contacts List */}
        <div className="space-y-3">
          {contacts.map((contact) => (
            <Card key={contact.id} variant="elevated" className="animate-fade-in">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{contact.name}</h3>
                      {contact.isPrimary && (
                        <span className="px-2 py-0.5 rounded-full bg-warning/10 text-warning text-xs font-medium">
                          Primary
                        </span>
                      )}
                    </div>
                    {contact.relationship && (
                      <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {contact.phone}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {!contact.isPrimary && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSetPrimary(contact.id)}
                        className="h-8 w-8"
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteContact(contact.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {contacts.length === 0 && (
          <div className="text-center py-12">
            <UserPlus className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">No trusted contacts yet</p>
            <p className="text-sm text-muted-foreground/60">
              Add contacts who should be notified in emergencies
            </p>
          </div>
        )}

        {/* Tips */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground text-sm mb-2">Tips</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Add at least 3 trusted contacts for better coverage</li>
              <li>• Set your primary contact as someone who's usually available</li>
              <li>• Include both family members and close friends</li>
              <li>• Make sure your contacts have saved your number too</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
}
