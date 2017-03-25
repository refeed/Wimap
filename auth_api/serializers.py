from django.contrib.auth import update_session_auth_hash

from rest_framework import serializers

from auth_api.models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = UserProfile
        # Everytime you update this field, you need to update argument in
        # AccountManager class authentication/models.py, look at the comment there.
        fields = ('id',
                  'email',
                  'username',
                  'full_name',
                  'bio',
                  'password',
                  'confirm_password',
                  'contact_handphone',
                  'address',
                  'date_joined',
                  'updated_at',)

        read_only_fields = ('date_joined', 'updated_at')

        def create(self, validated_data):
            # Deserialize serialized data to a python object
            return UserProfile.objects.create(**validated_data)

        def update(self, instance, validated_data):
            # Update Account using serialized data
            instance.username = validated_data.get('username', instance.username)
            instance.bio = validated_data.get('bio', instance.bio)
            instance.first_name = validated_data.get('first_name', instance.first_name)
            instance.last_name = validated_data.get('last_name', instance.last_name)
            instance.contact_handphone = validated_data.get('contact_handphone', instance.contact_handphone)
            instance.address = validated_data.get('address', instance.address)

            password = validated_data.get('password', None)
            confirm_password = validated_data.get('confirm_password', None)

            # Set the password if user has specified it
            if password and confirm_password and password == confirm_password:
                instance.set_password(password)

            instance.save()

            update_session_auth_hash(self.context.get('request'), instance)

            return instance
