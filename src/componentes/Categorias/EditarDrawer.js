import React, { useState, useEffect } from "react";
import { Drawer, Button, Input, Form, message, Spin, Popconfirm, Typography } from "antd";
import { DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { editarCategoriaId, getCategoriaId, eliminarcategoriaId } from "../../servicios/blogServicios";

const { Text } = Typography;

const EditarDrawer = ({ 
  categoriaId, 
  open, 
  onClose, 
  listaCategorias,
}) => {
  const [formulario] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [categoriaData, setCategoriaData] = useState(null);

  // Obtener datos de la categoría
  useEffect(() => {
    const fetchCategoriaData = async () => {
      if (!categoriaId?.id) return;
      
      setLoading(true);
      try {
        const response = await getCategoriaId(categoriaId.id);
        setCategoriaData(response);
        
        formulario.setFieldsValue({
          nombre: response.nombre,
        });
      } catch (error) {
        message.error('Error al cargar los datos de la categoría');
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchCategoriaData();
    }
  }, [categoriaId, open, formulario]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    try {
      const values = await formulario.validateFields();
      setLoading(true);

      const formData = new FormData();
      formData.append('nombre', values.nombre);

      await editarCategoriaId(categoriaId.id, formData);

      message.success('Categoría actualizada correctamente');
      onClose();
      await listaCategorias();
    } catch (error) {
      console.error("Update error:", error);
      if (error.response?.data) {
        message.error(`Error: ${error.response.data.message || 'Datos inválidos'}`);
      } else {
        message.error('Error al actualizar la categoría');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await eliminarcategoriaId(categoriaId.id);
      message.success('Categoría eliminada correctamente');
      onClose();
      await listaCategorias();
    } catch (error) {
      console.error("Delete error:", error);
      message.error(error.response?.data?.message || 'Error al eliminar la categoría');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text strong style={{ fontSize: 18 }}>
            {categoriaData ? `Editar "${categoriaData.nombre}"` : 'Editar Categoría'}
          </Text>
        </div>
      }
      width={520}
      onClose={onClose}
      open={open}
      destroyOnClose
      footer={
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Popconfirm
            title="¿Eliminar esta categoría?"
            description="Esta acción no se puede deshacer. ¿Estás seguro?"
            onConfirm={handleDelete}
            okText="Eliminar"
            cancelText="Cancelar"
            okButtonProps={{ 
              danger: true,
              loading: deleting,
              icon: <DeleteOutlined />
            }}
          >
            <Button 
              danger 
              type="text" 
              loading={deleting}
              disabled={!categoriaData}
            >
              Eliminar categoría
            </Button>
          </Popconfirm>
          
          <div>
            <Button 
              onClick={onClose} 
              style={{ marginRight: 12 }}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              type="primary" 
              onClick={handleSubmit}
              icon={<SaveOutlined />}
              loading={loading}
              disabled={!categoriaData}
            >
              Guardar cambios
            </Button>
          </div>
        </div>
      }
      bodyStyle={{ padding: '24px 24px 80px' }}
    >
      <Spin spinning={loading && !categoriaData}>
        <Form 
          form={formulario} 
          layout="vertical"
          onFinish={handleSubmit}
          disabled={loading || deleting}
        >
          <Form.Item 
            label={<Text strong>Nombre de la categoría</Text>}
            name="nombre"
            rules={[
              { required: true, message: 'El nombre es requerido' },
              { min: 3, message: 'Mínimo 3 caracteres' },
              { max: 50, message: 'Máximo 50 caracteres' }
            ]}
          >
            <Input 
              placeholder="Ej: Tecnología, Cocina, Viajes..."
              allowClear
            />
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
};

export default EditarDrawer;