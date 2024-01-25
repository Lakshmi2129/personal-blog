# forms.py
from django import forms
from .models import add_post
from ckeditor.widgets import CKEditorWidget

class AddPostForm(forms.ModelForm):
    class Meta:
        model = add_post
        fields = ['title', 'content', 'image', 'summary']

    widgets = {
        'summary': CKEditorWidget(),
    }
