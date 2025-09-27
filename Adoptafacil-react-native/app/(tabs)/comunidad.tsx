// Comunidad.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
    author: { name: "Fundación Huellitas Felices", avatarUrl: "https://i.pravatar.cc/150?u=huellitasfelices" },
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
    author: { name: "AdoptaFácil Admin", avatarUrl: "https://i.pravatar.cc/150?u=adoptafaciladmin" },
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
const PostCard = ({ post, onLike }: { post: Post; onLike: (id: number) => void }) => (
  <View style={styles.card}>
    <View style={styles.postHeader}>
      <Image source={{ uri: post.author.avatarUrl }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.author}>{post.author.name}</Text>
        <Text style={styles.timestamp}>{post.timestamp}</Text>
      </View>
    </View>

    <Text style={styles.content}>{post.content}</Text>

    {post.imageUrl ? <Image source={{ uri: post.imageUrl }} style={styles.postImage} /> : null}

    <View style={styles.actions}>
      <TouchableOpacity onPress={() => onLike(post.id)} style={styles.actionBtn}>
        <Ionicons name={post.is_liked ? "heart" : "heart-outline"} size={20} color={post.is_liked ? "#ef4444" : "#374151"} />
        <Text style={styles.actionText}>{post.likes}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn}>
        <Ionicons name="chatbubble-outline" size={20} color="#374151" />
        <Text style={styles.actionText}>{post.comments}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn}>
        <Ionicons name="share-social-outline" size={20} color="#374151" />
      </TouchableOpacity>
    </View>
  </View>
);

// --- Filtros (simple UI) ---
const PostFilters = () => (
  <View style={styles.filtersCard}>
    <Text style={styles.filterTitle}>Filtrar Publicaciones</Text>
    <View style={styles.searchBar}>
      <TextInput placeholder="Buscar por palabra clave..." style={styles.searchInput} placeholderTextColor="#cbd5e1" />
      <Ionicons name="search" size={20} color="#0dbd8b" />
    </View>
    <Text style={styles.categoriesTitle}>Categorías</Text>
    {["Campañas", "Noticias", "Consejos", "General"].map((cat, idx) => (
      <View key={idx} style={styles.categoryRow}>
        <View
          style={[
            styles.dot,
            { backgroundColor: ["#4ade80", "#2563eb", "#facc15", "#9ca3af"][idx] },
          ]}
        />
        <Text style={{ color: "#fff" }}>{cat}</Text>
      </View>
    ))}
  </View>
);


// --- Invitación ---
const JoinCommunity = () => (
  <View style={styles.joinCard}>

    <Ionicons name="log-in-outline" size={40} color="#0dbd8b" style={{ marginBottom: 8 }} />
    <Text style={styles.joinTitle}>¡Únete a nuestra comunidad!</Text>
    <Text style={styles.joinText}>
      Comparte experiencias, consejos y ayuda a otros amantes de los animales.
    </Text>
    <TouchableOpacity style={styles.createBtn}>
      <Text style={{ color: "#fff", fontWeight: "bold" }}>Crear Cuenta Gratis</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.loginBtn}>
      <Text style={{ color: "#0dbd8b" }}>Ya tengo cuenta</Text>
    </TouchableOpacity>

    <View style={styles.iconsRow}>
      <View style={styles.iconBox}>
        <Ionicons name="paw-outline" size={20} color="#f97316" />
        <Text style={styles.iconText}>Comparte</Text>
      </View>
      <View style={styles.iconBox}>
        <Ionicons name="chatbubble-ellipses-outline" size={20} color="#fff" />
        <Text style={styles.iconText}>Comenta</Text>
      </View>
      <View style={styles.iconBox}>
        <Ionicons name="heart-outline" size={20} color="#ef4444" />
        <Text style={styles.iconText}>Conecta</Text>
      </View>
    </View>
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
        placeholderTextColor="#6b7280"
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
        <Text style={styles.publishText}>Publicar</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- Pantalla principal ---
export default function Comunidad() {
  // inicializar posts garantizando is_liked
  const [posts, setPosts] = useState<Post[]>(() => samplePosts.map(p => ({ ...p })));

  const handleLike = (id: number) => {
    setPosts(prev =>
      prev.map(p =>
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
      author: { name: "Tú", avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}` },
      timestamp: "ahora",
      content: text,
      likes: 0,
      is_liked: false,
      comments: 0,
      category: "General",
    };
    setPosts(prev => [newPost, ...prev]);
  };

  // header que irá dentro del FlatList (para que todo sea scrollable y no se "pierda")
  const ListHeader = () => (
    <>
      {/* Hero */}
      <LinearGradient colors={["#0dbd8b", "#2563eb"]} style={styles.hero}>
        <Text style={styles.heroTitle}>Únete a nuestra Comunidad</Text>
        <Text style={styles.heroText}>
          Comparte historias, consejos, eventos y conecta con personas que buscan el bienestar animal.
        </Text>
      </LinearGradient>

      {/* Filtros e Invitación y Crear Post */}
      <PostFilters />
      <JoinCommunity />
      <View style={{ marginHorizontal: 12 }}>
        <CreatePost onPublish={handlePublish} />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} onLike={handleLike} />}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ paddingBottom: 60 }}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#111827" },
  list: { flex: 1 },

  hero: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  heroText: { color: "#e5e7eb", textAlign: "center" },

  filtersCard: {
    backgroundColor: "#1f2937",
    padding: 15,
    margin: 12,
    borderRadius: 12,
  },
  filterTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#111827",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  searchInput: { flex: 1, color: "#fff", marginRight: 8 },
  categoriesTitle: { color: "#fff", fontWeight: "bold", marginBottom: 6 },
  categoryRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },

  joinCard: {
    backgroundColor: "#1f2937",
    padding: 20,
    margin: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  joinTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  joinText: { color: "#d1d5db", textAlign: "center", marginBottom: 12 },
  createBtn: {
    backgroundColor: "#0dbd8b",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    width: "100%",
    alignItems: "center",
  },
  loginBtn: {
    borderWidth: 1,
    borderColor: "#0dbd8b",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  iconBox: { alignItems: "center" },
  iconText: { color: "#fff", marginTop: 4 },

  // 🔹 Create Post (antes estaba blanco)
  createPost: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#1f2937", // gris oscuro
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  input: { flex: 1, marginRight: 10, color: "#fff" }, // texto claro
  publishBtn: {
    backgroundColor: "#0dbd8b",
    padding: 8,
    borderRadius: 6,
  },
  publishText: { color: "#fff", fontWeight: "bold" },

  // 🔹 Post Card (igualada al esquema gris)
  card: {
    backgroundColor: "#1f2937", // gris oscuro
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 10 },
  author: { fontWeight: "700", color: "#fff" }, // texto blanco
  timestamp: { fontSize: 12, color: "#9ca3af" }, // gris claro
  content: { marginBottom: 8, color: "#e5e7eb" }, // texto gris claro
  postImage: { width: "100%", height: 200, borderRadius: 8, marginTop: 5 },
  actions: { flexDirection: "row", marginTop: 8 },
  actionBtn: { flexDirection: "row", alignItems: "center", marginRight: 18 },
  actionText: { marginLeft: 6, color: "#d1d5db" }, // gris clarito
});
