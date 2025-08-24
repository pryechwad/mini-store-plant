import React, { useState, useEffect } from "react";
import { addPlant, getPlants, updatePlant, deletePlant } from "../services/plantService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function Admin() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    categories: [],
    description: "",
    careInstructions: "",
    available: true,
    image: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [plants, setPlants] = useState([]);
  const [editingPlant, setEditingPlant] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState('add');

  const categoryOptions = [
    "Indoor Plants", "Outdoor Plants", "Succulents", "Air Purifying", 
    "Low Maintenance", "Flowering Plants", "Herbs", "Tropical Plants"
  ];

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPlants();
      setPlants(data);
    } catch (error) {
      console.error('Error loading plants:', error);
      setError('Failed to load plants. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setForm(prev => ({ ...prev, image: "" })); // Clear URL when file is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview("");
    setForm(prev => ({ ...prev, image: "" }));
  };

  const handleCategoryChange = (category) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    
    try {
      const plantData = {
        ...form,
        price: parseFloat(form.price)
      };
      
      if (editingPlant) {
        await updatePlant(editingPlant._id, plantData);
        setMessage("✅ Plant updated successfully!");
        setEditingPlant(null);
      } else {
        await addPlant(plantData);
        setMessage("✅ Plant added successfully!");
      }
      
      setForm({ 
        name: "", 
        price: "", 
        categories: [], 
        description: "",
        careInstructions: "",
        available: true,
        image: ""
      });
      setImageFile(null);
      setImagePreview("");
      
      loadPlants();
      setTimeout(() => setMessage(""), 3000);
      
    } catch {
      setMessage(`❌ Error ${editingPlant ? 'updating' : 'adding'} plant. Please try again.`);
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (plant) => {
    setForm({
      name: plant.name,
      price: plant.price.toString(),
      categories: plant.categories,
      description: plant.description || "",
      careInstructions: plant.careInstructions || "",
      available: plant.available,
      image: plant.image || ""
    });
    setImageFile(null);
    setImagePreview("");
    setEditingPlant(plant);
    setActiveTab('add');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      try {
        await deletePlant(id);
        setMessage("✅ Plant deleted successfully!");
        loadPlants();
        setTimeout(() => setMessage(""), 3000);
      } catch {
        setMessage("❌ Error deleting plant. Please try again.");
        setTimeout(() => setMessage(""), 5000);
      }
    }
  };

  const cancelEdit = () => {
    setEditingPlant(null);
    setForm({ 
      name: "", 
      price: "", 
      categories: [], 
      description: "",
      careInstructions: "",
      available: true,
      image: ""
    });
    setImageFile(null);
    setImagePreview("");
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">🌿 Plant Management</h1>
          <p className="page-subtitle">
            Manage your green paradise collection
          </p>
        </div>
      </div>

      <div className="container">
        {/* Tab Navigation */}
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '2rem'}}>
          <button 
            className={`btn ${activeTab === 'add' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('add')}
            style={{marginRight: '1rem'}}
          >
            {editingPlant ? '✏️ Edit Plant' : '➕ Add Plant'}
          </button>
          <button 
            className={`btn ${activeTab === 'manage' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('manage')}
          >
            📋 Manage Plants
          </button>
        </div>

        {activeTab === 'add' ? (
        <div className="grid grid-1" style={{maxWidth: '800px', margin: '0 auto'}}>
          {/* Form Card */}
          <div className="card card-glow p-4 fade-in">
            <h2 style={{color: 'var(--secondary-green)', fontSize: '1.8rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center'}}>
              {editingPlant ? '✏️ Edit Plant' : '🌱 Add New Plant'}
            </h2>
            
            {editingPlant && (
              <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                <button 
                  onClick={cancelEdit}
                  className="btn btn-secondary"
                  style={{fontSize: '0.9rem'}}
                >
                  ❌ Cancel Edit
                </button>
              </div>
            )}
            
            {message && (
              <div className="card scale-in" style={{
                padding: '1rem',
                marginBottom: '1.5rem',
                background: message.includes('✅') ? 'linear-gradient(135deg, var(--mint-green), var(--light-green))' : 'linear-gradient(135deg, #ffcdd2, #ffab91)',
                border: `2px solid ${message.includes('✅') ? 'var(--secondary-green)' : 'var(--earth-brown)'}`,
                borderRadius: '0.75rem'
              }}>
                <p style={{margin: 0, textAlign: 'center', fontWeight: '600', fontSize: '1.1rem'}}>{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-2 gap-3 mb-3">
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)'}}>
                    Plant Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g., Monstera Deliciosa"
                    value={form.name}
                    onChange={handleChange}
                    className="input"
                    style={{width: '100%'}}
                    required
                  />
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)'}}>
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="299"
                    value={form.price}
                    onChange={handleChange}
                    className="input"
                    style={{width: '100%'}}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)'}}>
                  Plant Image
                </label>
                
                {/* Image Upload Options */}
                <div style={{
                  border: '2px dashed var(--border-color)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  textAlign: 'center',
                  background: 'var(--glass-bg)',
                  marginBottom: '1rem'
                }}>
                  <div style={{marginBottom: '1rem'}}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{display: 'none'}}
                      id="imageUpload"
                    />
                    <label 
                      htmlFor="imageUpload"
                      className="btn btn-secondary"
                      style={{cursor: 'pointer', marginRight: '0.5rem'}}
                    >
                      📁 Upload Image
                    </label>
                    {(imageFile || form.image || imagePreview) && (
                      <button 
                        type="button"
                        onClick={clearImage}
                        className="btn"
                        style={{
                          background: 'linear-gradient(135deg, #ffcdd2, #ffab91)',
                          color: 'var(--earth-brown)',
                          border: '2px solid var(--earth-brown)'
                        }}
                      >
                        🗑️ Clear
                      </button>
                    )}
                  </div>
                  
                  <div style={{fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '1rem'}}>
                    Or enter image URL:
                  </div>
                  
                  <input
                    type="url"
                    name="image"
                    placeholder="https://example.com/plant-image.jpg"
                    value={form.image}
                    onChange={handleChange}
                    className="input"
                    style={{width: '100%'}}
                    disabled={!!imageFile}
                  />
                </div>
                
                {/* Image Preview */}
                {(imagePreview || form.image) && (
                  <div style={{textAlign: 'center', marginTop: '1rem'}}>
                    <img 
                      src={imagePreview || form.image} 
                      alt="Preview" 
                      style={{
                        maxWidth: '200px', 
                        maxHeight: '200px', 
                        borderRadius: '0.5rem', 
                        border: '2px solid var(--border-color)',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {e.target.src = 'https://via.placeholder.com/200x200?text=Invalid+Image'}}
                    />
                    <div style={{marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-light)'}}>
                      {imageFile ? `File: ${imageFile.name}` : 'URL Image'}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)'}}>
                  Categories * (Select multiple)
                </label>
                <div style={{
                  border: '2px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  background: 'var(--glass-bg)',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {categoryOptions.map((category) => (
                    <label key={category} className="flex items-center gap-2 mb-2" style={{cursor: 'pointer'}}>
                      <input
                        type="checkbox"
                        checked={form.categories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        style={{transform: 'scale(1.1)'}} 
                      />
                      <span style={{fontSize: '0.95rem', color: 'var(--text-dark)'}}>{category}</span>
                    </label>
                  ))}
                </div>
                {form.categories.length > 0 && (
                  <div style={{marginTop: '0.5rem'}}>
                    <small style={{color: 'var(--secondary-green)', fontSize: '0.85rem', fontWeight: '500'}}>
                      Selected: {form.categories.join(", ")}
                    </small>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)'}}>
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Brief description of the plant, its features, and benefits..."
                  value={form.description}
                  onChange={handleChange}
                  className="input"
                  style={{width: '100%', minHeight: '80px', resize: 'vertical'}}
                  rows="3"
                />
              </div>

              <div className="mb-3">
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)'}}>
                  Care Instructions
                </label>
                <textarea
                  name="careInstructions"
                  placeholder="Light requirements, watering schedule, soil type, etc..."
                  value={form.careInstructions}
                  onChange={handleChange}
                  className="input"
                  style={{width: '100%', minHeight: '80px', resize: 'vertical'}}
                  rows="3"
                />
              </div>

              <div className="mb-4">
                <label className="flex items-center gap-2" style={{cursor: 'pointer'}}>
                  <input
                    type="checkbox"
                    name="available"
                    checked={form.available}
                    onChange={handleChange}
                    style={{transform: 'scale(1.2)'}} 
                  />
                  <span style={{fontWeight: '500', color: 'var(--text-dark)'}}>Available for purchase</span>
                </label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{width: '100%'}}
                disabled={isSubmitting}
              >
                {isSubmitting ? (editingPlant ? "Updating..." : "Adding...") : (editingPlant ? "✏️ Update Plant" : "🌱 Add Plant to Store")}
              </button>
            </form>
          </div>

          {/* Tips Card */}
          <div className="card card-glow p-4 fade-in" style={{animationDelay: '0.2s'}}>
            <h3 style={{color: 'var(--secondary-green)', fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center'}}>
              💡 Plant Care Tips
            </h3>
            <div className="grid grid-2 gap-3">
              <div className="card" style={{padding: '1rem', background: 'var(--glass-bg)', border: '1px solid var(--border-color)'}}>
                <h4 style={{color: 'var(--accent-green)', fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: '600'}}>🌞 Light Requirements</h4>
                <p style={{color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.4'}}>Specify if the plant needs bright, medium, or low light conditions.</p>
              </div>
              <div className="card" style={{padding: '1rem', background: 'var(--glass-bg)', border: '1px solid var(--border-color)'}}>
                <h4 style={{color: 'var(--accent-green)', fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: '600'}}>💧 Watering Schedule</h4>
                <p style={{color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.4'}}>Include how often to water and signs of over/under-watering.</p>
              </div>
              <div className="card" style={{padding: '1rem', background: 'var(--glass-bg)', border: '1px solid var(--border-color)'}}>
                <h4 style={{color: 'var(--accent-green)', fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: '600'}}>🌡️ Temperature</h4>
                <p style={{color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.4'}}>Mention ideal temperature range and humidity preferences.</p>
              </div>
              <div className="card" style={{padding: '1rem', background: 'var(--glass-bg)', border: '1px solid var(--border-color)'}}>
                <h4 style={{color: 'var(--accent-green)', fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: '600'}}>🌱 Growth Tips</h4>
                <p style={{color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.4'}}>Share fertilizing schedule and pruning recommendations.</p>
              </div>
            </div>
          </div>
        </div>
        ) : (
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div className="card card-glow p-4 fade-in">
            <h2 style={{color: 'var(--secondary-green)', fontSize: '1.8rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center'}}>
              📋 Manage Plants ({plants.length})
            </h2>
            
            {message && (
              <div className="card scale-in" style={{
                padding: '1rem',
                marginBottom: '1.5rem',
                background: message.includes('✅') ? 'linear-gradient(135deg, var(--mint-green), var(--light-green))' : 'linear-gradient(135deg, #ffcdd2, #ffab91)',
                border: `2px solid ${message.includes('✅') ? 'var(--secondary-green)' : 'var(--earth-brown)'}`,
                borderRadius: '0.75rem'
              }}>
                <p style={{margin: 0, textAlign: 'center', fontWeight: '600', fontSize: '1.1rem'}}>{message}</p>
              </div>
            )}
            
            {error ? (
              <ErrorMessage 
                message={error}
                onRetry={loadPlants}
              />
            ) : isLoading ? (
              <LoadingSpinner message="Loading plants..." />
            ) : (
            <div className="grid grid-1 gap-3">
              {plants.map((plant) => (
                <div key={plant._id} className="card" style={{padding: '1.5rem', border: '2px solid var(--border-color)'}}>
                  <div className="grid grid-3 gap-3" style={{alignItems: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                      <img 
                        src={plant.image || 'https://via.placeholder.com/80x80?text=Plant'} 
                        alt={plant.name}
                        style={{width: '80px', height: '80px', borderRadius: '0.5rem', objectFit: 'cover', border: '2px solid var(--border-color)'}}
                        onError={(e) => {e.target.src = 'https://via.placeholder.com/80x80?text=Plant'}}
                      />
                      <div>
                        <h3 style={{margin: 0, fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-dark)'}}>{plant.name}</h3>
                        <p style={{margin: '0.25rem 0', color: 'var(--secondary-green)', fontWeight: '600', fontSize: '1.1rem'}}>₹{plant.price}</p>
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.5rem'}}>
                          {plant.categories.slice(0, 2).map((category, idx) => (
                            <span key={idx} style={{
                              background: 'var(--mint-green)',
                              color: 'var(--secondary-green)',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '0.25rem',
                              fontSize: '0.8rem',
                              fontWeight: '500'
                            }}>
                              {category}
                            </span>
                          ))}
                          {plant.categories.length > 2 && (
                            <span style={{
                              color: 'var(--text-light)',
                              fontSize: '0.8rem',
                              padding: '0.2rem 0.5rem'
                            }}>+{plant.categories.length - 2} more</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p style={{margin: 0, fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.4'}}>
                        {plant.description ? plant.description.substring(0, 100) + '...' : 'No description'}
                      </p>
                      <div style={{marginTop: '0.5rem'}}>
                        <span style={{
                          background: plant.available ? 'var(--mint-green)' : '#ffcdd2',
                          color: plant.available ? 'var(--secondary-green)' : 'var(--earth-brown)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}>
                          {plant.available ? '✅ Available' : '❌ Unavailable'}
                        </span>
                      </div>
                    </div>
                    
                    <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}>
                      <button 
                        onClick={() => handleEdit(plant)}
                        className="btn btn-secondary"
                        style={{fontSize: '0.9rem', padding: '0.5rem 1rem'}}
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(plant._id)}
                        className="btn"
                        style={{
                          fontSize: '0.9rem', 
                          padding: '0.5rem 1rem',
                          background: 'linear-gradient(135deg, #ffcdd2, #ffab91)',
                          color: 'var(--earth-brown)',
                          border: '2px solid var(--earth-brown)'
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {plants.length === 0 && !isLoading && !error && (
                <div style={{textAlign: 'center', padding: '3rem', color: 'var(--text-light)'}}>
                  <p style={{fontSize: '1.2rem', margin: 0}}>No plants found. Add some plants to get started!</p>
                </div>
              )}
            </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
