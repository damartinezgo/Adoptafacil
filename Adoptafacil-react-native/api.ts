import axios from "axios";

// Base URL for the API - adjust for your environment
// For Android emulator: http://10.0.2.2:8081
// For iOS simulator: http://localhost:8081
// For physical device: use your computer's IP address
const BASE_URL = "http://10.0.2.2:8081/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Mascotas API
export const mascotasAPI = {
  // Get all mascotas
  getAll: async () => {
    try {
      const response = await api.get("/mascotas");
      return response.data;
    } catch (error) {
      console.error("Error fetching mascotas:", error);
      throw error;
    }
  },

  // Get mascota by ID
  getById: async (id: number) => {
    try {
      const response = await api.get(`/mascotas/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching mascota:", error);
      throw error;
    }
  },

  // Search mascotas by name
  searchByName: async (name: string) => {
    try {
      const response = await api.get("/mascotas", { params: { nombre: name } });
      return response.data;
    } catch (error) {
      console.error("Error searching mascotas:", error);
      throw error;
    }
  },

  // Create new mascota
  create: async (mascota: any, imagenes?: File[]) => {
    try {
      const formData = new FormData();
      formData.append("mascota", JSON.stringify(mascota));
      if (imagenes) {
        imagenes.forEach((imagen, index) => {
          formData.append("imagenes", imagen);
        });
      }
      const response = await api.post("/mascotas", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating mascota:", error);
      throw error;
    }
  },

  // Delete mascota
  delete: async (id: number) => {
    try {
      await api.delete(`/mascotas/${id}`);
    } catch (error) {
      console.error("Error deleting mascota:", error);
      throw error;
    }
  },
};

// Persons API
export const personsAPI = {
  // Get all persons
  getAll: async () => {
    try {
      const response = await api.get("/persons");
      return response.data;
    } catch (error) {
      console.error("Error fetching persons:", error);
      throw error;
    }
  },

  // Get person by ID
  getById: async (id: number) => {
    try {
      const response = await api.get(`/persons/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching person:", error);
      throw error;
    }
  },

  // Get person by email
  getByEmail: async (email: string) => {
    try {
      const response = await api.get(`/persons/email/${email}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching person by email:", error);
      throw error;
    }
  },

  // Get persons by role
  getByRole: async (roleType: string) => {
    try {
      const response = await api.get(`/persons/role/${roleType}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching persons by role:", error);
      throw error;
    }
  },

  // Create new person
  create: async (person: any) => {
    try {
      const response = await api.post("/persons", person);
      return response.data;
    } catch (error) {
      console.error("Error creating person:", error);
      throw error;
    }
  },

  // Update person
  update: async (id: number, person: any) => {
    try {
      const response = await api.put(`/persons/${id}`, person);
      return response.data;
    } catch (error) {
      console.error("Error updating person:", error);
      throw error;
    }
  },

  // Delete person
  delete: async (id: number) => {
    try {
      await api.delete(`/persons/${id}`);
    } catch (error) {
      console.error("Error deleting person:", error);
      throw error;
    }
  },
};

// Donaciones API
export const donacionesAPI = {
  // Get all donaciones
  getAll: async () => {
    try {
      const response = await api.get("/donaciones");
      return response.data;
    } catch (error) {
      console.error("Error fetching donaciones:", error);
      throw error;
    }
  },

  // Get donacion by ID
  getById: async (id: number) => {
    try {
      const response = await api.get(`/donaciones/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching donacion:", error);
      throw error;
    }
  },

  // Get donaciones by donante ID
  getByDonante: async (donanteId: number) => {
    try {
      const response = await api.get(`/donaciones/donante/${donanteId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching donaciones by donante:", error);
      throw error;
    }
  },

  // Create new donacion
  create: async (donacion: any) => {
    try {
      const response = await api.post("/donaciones", donacion);
      return response.data;
    } catch (error) {
      console.error("Error creating donacion:", error);
      throw error;
    }
  },

  // Delete donacion
  delete: async (id: number) => {
    try {
      await api.delete(`/donaciones/${id}`);
    } catch (error) {
      console.error("Error deleting donacion:", error);
      throw error;
    }
  },
};

// Solicitudes API
export const solicitudesAPI = {
  // Get all solicitudes
  getAll: async () => {
    try {
      const response = await api.get("/solicitudes");
      return response.data;
    } catch (error) {
      console.error("Error fetching solicitudes:", error);
      throw error;
    }
  },

  // Create new solicitud
  create: async (solicitud: any) => {
    try {
      const response = await api.post("/solicitudes", solicitud);
      return response.data;
    } catch (error) {
      console.error("Error creating solicitud:", error);
      throw error;
    }
  },

  // Update solicitud estado
  updateEstado: async (id: number, estado: string, comentario?: string) => {
    try {
      const response = await api.put(`/solicitudes/${id}/estado`, null, {
        params: { estado, comentario },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating solicitud estado:", error);
      throw error;
    }
  },
};

// You can add more API modules here for other controllers like donaciones, solicitudes, etc.

export default api;
