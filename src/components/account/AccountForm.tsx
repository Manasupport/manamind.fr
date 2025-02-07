import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface AccountFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AccountForm = ({ formData, setFormData, onSubmit }: AccountFormProps) => {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-8">
      <h2 className="text-4xl font-bold text-white mb-8">
        Créez et animez vos parcours
      </h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="lastName" className="text-white text-xs capitalize">
            Nom
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
            className="bg-white/90 backdrop-blur-sm border-b border-gray-300 h-12 text-sm"
            placeholder="Otmany"
          />
        </div>

        <div>
          <Label htmlFor="firstName" className="text-white text-xs capitalize">
            Prénom
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
            className="bg-white/90 backdrop-blur-sm border-b border-gray-300 h-12 text-sm"
            placeholder="Yanis"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-white text-xs capitalize">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="bg-white/90 backdrop-blur-sm border-b border-gray-300 h-12 text-sm"
            placeholder="hello@reallygreatsite.com"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-white text-black hover:bg-gray-100 h-12 text-lg font-bold"
      >
        Je crée mon compte
      </Button>

      <div className="text-center mt-4 text-white text-sm">
        <a
          href="https://app.manamind.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          J'ai déjà un compte, je me connecte
        </a>
      </div>
    </form>
  );
};