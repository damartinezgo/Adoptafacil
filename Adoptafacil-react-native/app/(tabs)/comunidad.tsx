import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

// --- Interfaces ---
interface Post {
  id: number;
  author: { name: string; avatarUrl: string };
  timestamp: string;
  content: string;
  imageUrl?: string;
  likes: number;
  is_liked: boolean;
  comments: number;
  category: string;
}

// --- Datos de ejemplo (asegurando is_liked) ---
const samplePosts: Post[] = [
  {
    id: 1,
    author: {
      name: "Fundación Huellitas Felices",
      avatarUrl: "https://i.pravatar.cc/150?u=huellitasfelices",
    },
    timestamp: "hace 2 horas",
    content:
      "¡Gran jornada de esterilización este fin de semana! 🐾 Tendremos precios especiales y apoyo de veterinarios expertos.",
    imageUrl:
      "https://images.unsplash.com/photo-1549483363-1c8b7be41523?q=80&w=870&auto=format&fit=crop",
    likes: 125,
    is_liked: false,
    comments: 12,
    category: "Campañas",
  },
  {
    id: 2,
    author: {
      name: "AdoptaFácil Admin",
      avatarUrl: "https://i.pravatar.cc/150?u=adoptafaciladmin",
    },
    timestamp: "hace 1 día",
    content:
      "¡Bienvenidos a nuestra nueva sección de Comunidad! ✨ Este es un espacio para conectar, compartir y colaborar por los animales.",
    likes: 350,
    is_liked: false,
    comments: 45,
    category: "Noticias",
  },
];

// --- PostCard ---
const PostCard = ({
  post,
  onLike,
}: {
  post: Post;
  onLike: (id: number) => void;
}) => (
  <View style={styles.card}>
    <View style={styles.postHeader}>
      <Image source={{ uri: post.author.avatarUrl }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <ThemedText style={styles.author}>{post.author.name}</ThemedText>
        <ThemedText style={styles.timestamp}>{post.timestamp}</ThemedText>
      </View>
    </View>

    <ThemedText style={styles.content}>{post.content}</ThemedText>

    {post.imageUrl ? (
      <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
    ) : null}

    <View style={styles.actions}>
      <TouchableOpacity
        onPress={() => onLike(post.id)}
        style={styles.actionBtn}
      >
        <Ionicons
          name={post.is_liked ? "heart" : "heart-outline"}
          size={20}
          color={post.is_liked ? "#68d391" : "#718096"}
        />
        <ThemedText style={styles.actionText}>{post.likes}</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn}>
        <Ionicons name="chatbubble-outline" size={20} color="#718096" />
        <ThemedText style={styles.actionText}>{post.comments}</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn}>
        <Ionicons name="share-social-outline" size={20} color="#718096" />
      </TouchableOpacity>
    </View>
  </View>
);

// --- Filtros (simple UI) ---
const PostFilters = () => (
  <View style={styles.filtersCard}>
    <ThemedText style={styles.filterTitle}>Filtrar Publicaciones</ThemedText>
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Buscar por palabra clave..."
        style={styles.searchInput}
        placeholderTextColor="#718096"
      />
      <Ionicons name="search" size={20} color="#68d391" />
    </View>
    <ThemedText style={styles.categoriesTitle}>Categorías</ThemedText>
    {["Campañas", "Noticias", "Consejos", "General"].map((cat, idx) => (
      <View key={idx} style={styles.categoryRow}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor: ["#68d391", "#63b3ed", "#a78bfa", "#718096"][
                idx
              ],
            },
          ]}
        />
        <ThemedText style={styles.categoryText}>{cat}</ThemedText>
      </View>
    ))}
  </View>
);

// --- Crear Post (comportamiento real) ---
const CreatePost = ({ onPublish }: { onPublish: (text: string) => void }) => {
  const [text, setText] = useState("");
  return (
    <View style={styles.createPost}>
      <TextInput
        style={styles.input}
        placeholder="¿Qué quieres compartir hoy?"
        value={text}
        onChangeText={setText}
        placeholderTextColor="#718096"
      />
      <TouchableOpacity
        style={styles.publishBtn}
        onPress={() => {
          if (!text.trim()) return;
          onPublish(text.trim());
          setText("");
          Keyboard.dismiss();
        }}
      >
        <ThemedText style={styles.publishText}>Publicar</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

// --- Pantalla principal ---
export default function Comunidad() {
  // inicializar posts garantizando is_liked
  const [posts, setPosts] = useState<Post[]>(() =>
    samplePosts.map((p) => ({ ...p }))
  );

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              is_liked: !p.is_liked,
              likes: p.is_liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  const handlePublish = (text: string) => {
    const newPost: Post = {
      id: Date.now(),
      author: {
        name: "Tú",
        avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`,
      },
      timestamp: "ahora",
      content: text,
      likes: 0,
      is_liked: false,
      comments: 0,
      category: "General",
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section con gradiente */}
      <LinearGradient
        colors={["#02d36bff", "#0000c5ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroSection}
      >
        <ThemedText style={styles.heroTitle}>
          Únete a nuestra Comunidad
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          Comparte historias, consejos, eventos y conecta con personas que
          buscan el bienestar animal
        </ThemedText>
      </LinearGradient>

      {/* Sección de contenido */}
      <ThemedView style={styles.contentSection}>
        <PostFilters />
        <CreatePost onPublish={handlePublish} />

        {/* Posts */}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLike} />
        ))}
      </ThemedView>
    </ScrollView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fafc",
  },
  heroSection: {
    padding: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  contentSection: {
    padding: 20,
  },
  filtersCard: {
    backgroundColor: "#f0fff4",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#c6f6d5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#68d391",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    color: "#2d3748",
    marginRight: 8,
    fontSize: 15,
  },
  categoriesTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  categoryText: {
    color: "#2d3748",
    fontSize: 14,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  createPost: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 15,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginRight: 10,
    color: "#2d3748",
    fontSize: 15,
  },
  publishBtn: {
    backgroundColor: "#68d391",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  publishText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  author: {
    fontWeight: "600",
    color: "#2d3748",
    fontSize: 15,
  },
  timestamp: {
    fontSize: 12,
    color: "#718096",
    marginTop: 2,
  },
  content: {
    marginBottom: 10,
    color: "#2d3748",
    lineHeight: 20,
    fontSize: 15,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  actions: {
    flexDirection: "row",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  actionText: {
    marginLeft: 6,
    color: "#718096",
    fontSize: 14,
    fontWeight: "500",
  },
});
